package com.iuh.fit.recycling.receiving.models;

import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentStatus;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FunctionalAssessmentItemRequest {
    private String quotingItemId;
    private String note;
    private Boolean accepted;
}
