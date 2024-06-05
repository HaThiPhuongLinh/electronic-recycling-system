package com.iuh.fit.recycling.receiving.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentStatus;
import com.iuh.fit.recycling.receiving.entities.ReceivedItem;
import com.iuh.fit.recycling.receiving.entities.ReceivedStatus;
import com.iuh.fit.recycling.receiving.exception.BadRequestException;
import com.iuh.fit.recycling.receiving.exception.NotFoundException;
import com.iuh.fit.recycling.receiving.models.ItemStatusDTO;
import com.iuh.fit.recycling.receiving.models.ReceivedItemRequest;
import com.iuh.fit.recycling.receiving.repositories.FunctionalAssessmentReceivedItemRepository;
import com.iuh.fit.recycling.receiving.repositories.ReceivedItemRepository;
import com.iuh.fit.recycling.receiving.services.FunctionalAssessmentReceivedItemService;
import com.iuh.fit.recycling.receiving.services.ReceivedItemService;
import com.iuh.fit.recycling.receiving.services.S3Service;
import com.iuh.fit.recycling.receiving.utils.CheckFileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;


@Service
@RequiredArgsConstructor
public class ReceivedItemServiceImpl implements ReceivedItemService {

    private final ReceivedItemRepository receivedItemRepository;

    private final FunctionalAssessmentReceivedItemRepository functionalAssessmentReceivedItemRepository;

    private final JmsTemplate template;

    private final S3 s3Service;

    @Value("${aws.endpointUrl}")
    private String endpointUri;


    private final ObjectMapper mapper = new ObjectMapper();

    private String getDateTimeString(LocalDateTime dateTime){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        return dateTime.format(formatter);
    }

    @Override
    public List<ReceivedItem> findAllByStatus(ReceivedStatus status) {
        return receivedItemRepository.findAllByStatus(status);
    }

    @Override
    public List<ReceivedItem> findAll() {
        return receivedItemRepository.findAll();
    }

    @Override
    public ReceivedItem findByQuotingItemId(String quotingItemId) {
        return receivedItemRepository.findByQuotingItemId(quotingItemId)
                .orElseThrow(()-> new NotFoundException("quoting item not found"));
    }

    @Override
    public ReceivedItem findById(Long receivedItemId) {
        if (receivedItemId == null)
            throw new BadRequestException("receivedItemId");
        return receivedItemRepository.findById(receivedItemId)
                .orElseThrow(()->new BadRequestException("received item not found"));
    }

    @Override
    public ReceivedItem receive(String quotingItemId) throws JsonProcessingException {

        RestClient restClient = RestClient.create();

        Boolean isPresent = restClient.get()
                .uri("http://localhost:8081/api/v1/quote/exist/"+ quotingItemId)
                .retrieve()
                .body(Boolean.class);

        if (Boolean.FALSE.equals(isPresent)){
            throw new BadRequestException("Quoting item not exist");
        }


        ReceivedItem receivedItem = ReceivedItem.builder()
                .time(LocalDateTime.now())
                .quotingItemId(quotingItemId)
                .status(ReceivedStatus.PENDING)
                .build();


        receivedItem = receivedItemRepository.save(receivedItem);

        ItemStatusDTO itemStatusDTO = ItemStatusDTO.builder()
                .quotingItemId(quotingItemId)
                .time(getDateTimeString(LocalDateTime.now()))
                .accepted(null)
                .build();

        String itemStatusString = mapper.writeValueAsString(itemStatusDTO);

        template.convertAndSend("recycling_received", itemStatusString);
        return receivedItem;
    }

    @Override
    public ReceivedItem updateReceivedItemProof(ReceivedItemRequest request, List<MultipartFile> receivingProof) throws IOException {
        if (request == null || request.getQuotingItemId() == null || request.getAccepted() == null)
            throw new BadRequestException("quotingItemId and accepted is required");

        if (receivingProof == null || receivingProof.size() < 4 || !CheckFileUtil.checkFile(receivingProof))
            throw new BadRequestException("Need 3 image and 1 video to submit");

        ReceivedItem receivedItem = findByQuotingItemId(request.getQuotingItemId());

        if(!receivedItem.getStatus().equals(ReceivedStatus.PENDING)){
            throw new BadRequestException("The received item has been " + receivedItem.getStatus());
        }

        List<String> proof = new ArrayList<String>();
        for (MultipartFile multipartFile: receivingProof){
            String fileUrl = s3Service.uploadFile(multipartFile);
            System.out.println(fileUrl);
            proof.add(fileUrl);
        }

        receivedItem = ReceivedItem.builder()
                .id(receivedItem.getId())
                .quotingItemId(request.getQuotingItemId())
                .note(request.getNote())
                .time(LocalDateTime.now())
                .mediaProof(proof)
                .status(request.getAccepted() ? ReceivedStatus.ACCEPTED : ReceivedStatus.DENIED)
                .build();

        receivedItem = receivedItemRepository.save(receivedItem);

        if (receivedItem.getStatus().equals(ReceivedStatus.ACCEPTED)) {
            FunctionalAssessmentReceivedItem functionalAssessmentReceivedItem = FunctionalAssessmentReceivedItem.builder()
                    .receivedItem(receivedItem)
                    .status(FunctionalAssessmentStatus.PENDING)
                    .time(LocalDateTime.now())
                    .build();

            functionalAssessmentReceivedItemRepository.save(functionalAssessmentReceivedItem);

        }

        ItemStatusDTO statusDTO = ItemStatusDTO.builder()
                .quotingItemId(request.getQuotingItemId())
                .time(getDateTimeString(LocalDateTime.now()))
                .accepted(request.getAccepted())
                .build();

        String itemStatusString = mapper.writeValueAsString(statusDTO);
        template.convertAndSend("recycling_received", itemStatusString);

        return receivedItem;
    }
}
