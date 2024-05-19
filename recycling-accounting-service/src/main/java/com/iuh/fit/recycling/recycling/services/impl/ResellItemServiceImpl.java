package com.iuh.fit.recycling.recycling.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentStatus;
import com.iuh.fit.recycling.receiving.exception.BadRequestException;
import com.iuh.fit.recycling.receiving.exception.NotFoundException;
import com.iuh.fit.recycling.receiving.models.ItemStatusDTO;
import com.iuh.fit.recycling.receiving.repositories.FunctionalAssessmentReceivedItemRepository;
import com.iuh.fit.recycling.receiving.services.FunctionalAssessmentReceivedItemService;
import com.iuh.fit.recycling.receiving.utils.DateTimeUtil;
import com.iuh.fit.recycling.recycling.entities.RecyclingItem;
import com.iuh.fit.recycling.recycling.entities.ResellItem;
import com.iuh.fit.recycling.recycling.repositories.RecyclingItemRepository;
import com.iuh.fit.recycling.recycling.repositories.ResellItemRepository;
import com.iuh.fit.recycling.recycling.services.ResellItemService;
import com.iuh.fit.recycling.recycling.utils.RestUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResellItemServiceImpl implements ResellItemService {
    private final ResellItemRepository resellItemRepository;
    private final RecyclingItemRepository recyclingItemRepository;
    private final JmsTemplate template;
//    private final FunctionalAssessmentReceivedItemService functionalAssessmentReceivedItemService;
    @Override
    public List<ResellItem> findAll() {
        return resellItemRepository.findAll();
    }

    @Override
    public ResellItem findByQuotingItemId(String quotingItemId) {
        return resellItemRepository.findByItemReceivedItemQuotingItemId(quotingItemId)
                .orElseThrow(() -> new NotFoundException("Item not found"));
    }

    @Override
    public ResellItem addNewResellItem(String quotingItemId) throws JsonProcessingException {

        FunctionalAssessmentReceivedItem item = RestUtils.getFunctionalAssessmentReceivedItemByQuotingItemId(quotingItemId);
        if(item == null)
            throw new BadRequestException("The item not found in assessment service");

        if (item.getStatus().equals(FunctionalAssessmentStatus.PENDING))
            throw new BadRequestException("The item pending at assessment service");

        if (item.getStatus().equals(FunctionalAssessmentStatus.DENIED))
            throw new BadRequestException("The item has been denied by assessment service");

        if (recyclingItemRepository.findByItemReceivedItemQuotingItemId(quotingItemId).isPresent())
            throw new BadRequestException("The item has been store at recycling item");


        ResellItem existedItem = resellItemRepository.findByItemReceivedItemQuotingItemId(quotingItemId).orElse(null);
        if (existedItem != null)
            throw new BadRequestException("The item has been existed");

        ResellItem resellItem = ResellItem.builder()
                .item(item)
                .time(LocalDateTime.now())
                .build();

        resellItem = resellItemRepository.save(resellItem);

        ItemStatusDTO itemStatusDTO = ItemStatusDTO.builder()
                .time(DateTimeUtil.getDateTimeString(LocalDateTime.now()))
                .quotingItemId(quotingItemId)
                .accepted(true)
                .build();


        ObjectMapper mapper = new ObjectMapper();
        String itemStatusDTOString = mapper.writeValueAsString(itemStatusDTO);
        template.convertAndSend("recycling_process", itemStatusDTOString);

        return resellItem;
    }

}
