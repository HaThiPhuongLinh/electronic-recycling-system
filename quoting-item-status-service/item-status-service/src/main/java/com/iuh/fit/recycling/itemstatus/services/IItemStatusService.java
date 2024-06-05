package com.iuh.fit.recycling.itemstatus.services;

import com.iuh.fit.recycling.itemstatus.entities.ItemStatus;
import com.iuh.fit.recycling.itemstatus.entities.Status;
import com.iuh.fit.recycling.itemstatus.models.responses.ItemStatusResponse;
import com.iuh.fit.recycling.quoting.entities.QuotingItem;

import java.util.List;

public interface IItemStatusService {

    boolean existsByQuotingItemIdAndStatus(String quotingItemId, Status status);
    boolean existsByQuotingItemId(String quotingItemId);

    ItemStatus add(ItemStatus itemStatus);

    ItemStatusResponse getByQuotingItemId(String quotingItemId);
}
