package com.iuh.fit.recycling.quoting.models;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuotingItemRequest {
    private String customerName;
    private String email;
    private String address;
    private String bankName;
    private String accountNumber;
    private Long productId;
    private List<Long> conditionIds;

}
