package com.iuh.fit.recycling.itemstatus.models.responses;

import com.iuh.fit.recycling.itemstatus.entities.ItemState;
import com.iuh.fit.recycling.quoting.entities.QuotingItem;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ItemStatusResponse {
    private QuotingItem quotingItem;
    private List<ItemState> state;
}
