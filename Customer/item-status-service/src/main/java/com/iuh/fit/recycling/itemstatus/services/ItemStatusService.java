package com.iuh.fit.recycling.itemstatus.services;

import com.iuh.fit.recycling.itemstatus.entities.ItemState;
import com.iuh.fit.recycling.itemstatus.entities.ItemStatus;
import com.iuh.fit.recycling.itemstatus.models.responses.ItemStatusResponse;
import com.iuh.fit.recycling.itemstatus.repositories.ItemStatusRepository;
import com.iuh.fit.recycling.quoting.entities.QuotingItem;
import com.iuh.fit.recycling.quoting.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemStatusService implements IItemStatusService{

    private final ItemStatusRepository itemStatusRepository;

    @Override
    public ItemStatus add(ItemStatus itemStatus) {
        if (itemStatus == null)
            throw new BadRequestException("info is required");

        return itemStatusRepository.save(itemStatus);
    }

    @Override
    public ItemStatusResponse getByQuotingItemId(String quotingItemId) {
        List<ItemStatus> itemStatuses = itemStatusRepository.findAllByQuotingItemQuotingItemId(quotingItemId);
        if (itemStatuses.isEmpty())
            throw new BadRequestException("Quoting Item not found");
        List<ItemState> states = new ArrayList<>();
        QuotingItem quotingItem = itemStatuses.get(0).getQuotingItem();
        for (ItemStatus itemStatus : itemStatuses){
            states.add(ItemState.builder()
                    .status(itemStatus.getStatus())
                    .time(itemStatus.getDateTime())
                    .build());
        }

        return ItemStatusResponse.builder()
                .quotingItem(quotingItem)
                .state(states)
                .build();
    }
}
