package com.iuh.fit.recycling.receiving.models;

import com.iuh.fit.recycling.receiving.entities.ReceivedStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReceivedItemRequest {
    private String quotingItemId;
    private String note;
    private Boolean accepted;
}
