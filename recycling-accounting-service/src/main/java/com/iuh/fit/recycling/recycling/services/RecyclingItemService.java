package com.iuh.fit.recycling.recycling.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.fit.recycling.recycling.entities.RecyclingItem;
import com.iuh.fit.recycling.recycling.models.RecyclingItemRequest;

import java.util.List;

public interface RecyclingItemService {
    List<RecyclingItem> findAll();
    RecyclingItem findByQuotingItemId(String quotingItemId);
    RecyclingItem addNewRecyclingItem(RecyclingItemRequest request) throws JsonProcessingException;
}
