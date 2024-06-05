package com.iuh.fit.recycling.recycling.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.fit.recycling.recycling.entities.ResellItem;

import java.util.List;

public interface ResellItemService {
    List<ResellItem> findAll();
    ResellItem findByQuotingItemId(String quotingItemId);
    ResellItem addNewResellItem(String quotingItemId) throws JsonProcessingException;
}
