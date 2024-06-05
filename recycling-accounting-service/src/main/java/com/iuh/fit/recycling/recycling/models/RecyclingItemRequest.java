package com.iuh.fit.recycling.recycling.models;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RecyclingItemRequest {
    private String quotingItemId;
    private List<Long> claimedAccessoryIds;
    private String note;
}
