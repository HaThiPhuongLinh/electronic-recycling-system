package com.iuh.fit.recycling.recycling.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentStatus;
import com.iuh.fit.recycling.receiving.exception.BadRequestException;
import com.iuh.fit.recycling.receiving.exception.NotFoundException;
import com.iuh.fit.recycling.receiving.models.ItemStatusDTO;
import com.iuh.fit.recycling.receiving.services.FunctionalAssessmentReceivedItemService;
import com.iuh.fit.recycling.receiving.utils.DateTimeUtil;
import com.iuh.fit.recycling.recycling.entities.Accessory;
import com.iuh.fit.recycling.recycling.entities.RecyclingItem;
import com.iuh.fit.recycling.recycling.models.RecyclingItemRequest;
import com.iuh.fit.recycling.recycling.repositories.RecyclingItemRepository;
import com.iuh.fit.recycling.recycling.repositories.ResellItemRepository;
import com.iuh.fit.recycling.recycling.services.AccessoryService;
import com.iuh.fit.recycling.recycling.services.RecyclingItemService;
import com.iuh.fit.recycling.recycling.services.ResellItemService;
import com.iuh.fit.recycling.recycling.utils.RestUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RecyclingItemServiceImpl implements RecyclingItemService {

    private final RecyclingItemRepository recyclingItemRepository;
    private final ResellItemRepository resellItemRepository;
    private final AccessoryService accessoryService;
    private final JmsTemplate template;
//    private final FunctionalAssessmentReceivedItemService functionalAssessmentReceivedItemService;

    @Override
    public List<RecyclingItem> findAll() {
        return recyclingItemRepository.findAll();
    }

    @Override
    public RecyclingItem findByQuotingItemId(String quotingItemId) {
        return recyclingItemRepository.findByItemReceivedItemQuotingItemId(quotingItemId)
                .orElseThrow(() -> new NotFoundException("Item not found"));
    }

    @Override
    public RecyclingItem addNewRecyclingItem(RecyclingItemRequest request) throws JsonProcessingException {

        if (request == null || request.getQuotingItemId() == null || request.getClaimedAccessoryIds() == null){
            throw new BadRequestException("quotingItemId and claimed accessory is required");
        }

        FunctionalAssessmentReceivedItem item = RestUtils.getFunctionalAssessmentReceivedItemByQuotingItemId(request.getQuotingItemId());
        if(item == null)
            throw new BadRequestException("The item not found in assessment service");

        if (item.getStatus().equals(FunctionalAssessmentStatus.PENDING))
            throw new BadRequestException("The item pending at assessment service");

        if (item.getStatus().equals(FunctionalAssessmentStatus.DENIED))
            throw new BadRequestException("The item has been denied by assessment service");

        if (resellItemRepository.findByItemReceivedItemQuotingItemId(request.getQuotingItemId()).isPresent())
            throw new BadRequestException("The item stored at resell item");


        RecyclingItem existedItem = recyclingItemRepository.findByItemReceivedItemQuotingItemId(request.getQuotingItemId()).orElse(null);
        if (existedItem != null)
            throw new BadRequestException("The item has been existed");



        Set<Accessory> claimedAccessories = new HashSet<Accessory>();
        for (Long id : request.getClaimedAccessoryIds()){
            claimedAccessories.add(accessoryService.findById(id));
        }

        RecyclingItem recyclingItem = RecyclingItem.builder()
                .item(item)
                .claimedAccessory(claimedAccessories)
                .note(request.getNote())
                .time(LocalDateTime.now())
                .build();

        recyclingItem = recyclingItemRepository.save(recyclingItem);

        ObjectMapper mapper = new ObjectMapper();
        ItemStatusDTO itemStatusDTO = ItemStatusDTO.builder()
                .quotingItemId(request.getQuotingItemId())
                .time(DateTimeUtil.getDateTimeString(LocalDateTime.now()))
                .accepted(false)
                .build();

        String itemStatusDTOString = mapper.writeValueAsString(itemStatusDTO);

        template.convertAndSend("recycling_process", itemStatusDTOString);
        return recyclingItem;
    }
}
