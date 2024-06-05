package com.iuh.fit.recycling.receiving.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ItemStatusDTO {
    private String quotingItemId;
    private String time;
    private Boolean accepted;
}
