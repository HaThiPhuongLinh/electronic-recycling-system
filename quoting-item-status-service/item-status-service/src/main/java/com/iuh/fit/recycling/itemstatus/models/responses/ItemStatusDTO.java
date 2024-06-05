package com.iuh.fit.recycling.itemstatus.models.responses;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ItemStatusDTO {
    private String quotingItemId;
    private String time;
    private Boolean accepted;
}
