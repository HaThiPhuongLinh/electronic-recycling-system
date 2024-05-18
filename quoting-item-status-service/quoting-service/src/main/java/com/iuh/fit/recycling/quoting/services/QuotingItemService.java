package com.iuh.fit.recycling.quoting.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.fit.recycling.quoting.entities.QuotingItem;
import com.iuh.fit.recycling.quoting.models.GetQuotingPriceRequest;
import com.iuh.fit.recycling.quoting.models.QuotingItemRequest;

import java.util.List;

public interface QuotingItemService {
    QuotingItem getQuotingPrice(GetQuotingPriceRequest request);

    QuotingItem add(QuotingItemRequest request) throws JsonProcessingException;

    QuotingItem findById(String quotingItemId);

    List<QuotingItem> findAll();

    Boolean existByQuotingItemId(String quotingItemId);

}
