package com.iuh.fit.recycling.quoting.models;

import lombok.Data;

import java.util.List;

@Data
public class GetQuotingPriceRequest {
    private Long productId;
    private List<Long> conditionIds;
}
