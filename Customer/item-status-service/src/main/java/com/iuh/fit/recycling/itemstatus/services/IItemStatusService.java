package com.iuh.fit.recycling.itemstatus.services;

import com.iuh.fit.recycling.itemstatus.entities.ItemStatus;
import com.iuh.fit.recycling.itemstatus.models.responses.ItemStatusResponse;
import com.iuh.fit.recycling.quoting.entities.QuotingItem;

import java.util.List;

public interface IItemStatusService {
    ItemStatus add(ItemStatus itemStatus);

    ItemStatusResponse getByQuotingItemId(String quotingItemId);
}
