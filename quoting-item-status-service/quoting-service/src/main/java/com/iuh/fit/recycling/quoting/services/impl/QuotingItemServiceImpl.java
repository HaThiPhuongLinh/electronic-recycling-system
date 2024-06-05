package com.iuh.fit.recycling.quoting.services.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.fit.recycling.quoting.entities.*;
import com.iuh.fit.recycling.quoting.exception.BadRequestException;
import com.iuh.fit.recycling.quoting.exception.NotFoundException;
import com.iuh.fit.recycling.quoting.models.GetQuotingPriceRequest;
import com.iuh.fit.recycling.quoting.models.QuotingItemRequest;
import com.iuh.fit.recycling.quoting.repositories.QuotingItemRepository;
import com.iuh.fit.recycling.quoting.services.ConditionService;
import com.iuh.fit.recycling.quoting.services.CustomerService;
import com.iuh.fit.recycling.quoting.services.ProductService;
import com.iuh.fit.recycling.quoting.services.QuotingItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class QuotingItemServiceImpl implements QuotingItemService {

    private final CustomerService customerService;
    private final ProductService productService;
    private final ConditionService conditionService;
    private final QuotingItemRepository quotingItemRepository;
    private final JmsTemplate template;

    private final int maxDecreasedValue = 98;
    private final int minDecreasedValue = 10;

    private Set<Condition> getConditionsByIds(List<Long> conditionIds){
        Set<Condition> conditions = new HashSet<>();
        boolean containBattery = false;
        boolean containOverall = false;
        boolean containScreen = false;

        for (Long conditionId : conditionIds) {
            Condition condition = conditionService.findById(conditionId);
            if (condition.getType().equals(ConditionType.BATTERY) && containBattery)
                continue;

            if (condition.getType().equals(ConditionType.SEALED)) {
                return Set.of(condition);
            }

            if (condition.getType().equals(ConditionType.BATTERY))
                containBattery = true;
            if (condition.getType().equals(ConditionType.OVERALL))
                containOverall = true;
            if (condition.getType().equals(ConditionType.SCREEN))
                containScreen = true;

            conditions.add(condition);
        }

        if (!containBattery || !containOverall || !containScreen) {
            throw new BadRequestException("Must include conditions of type OVERALL, SCREEN, and BATTERY");
        }

        return conditions;
    }

    private double getPrice(Product product, Set<Condition> conditions){
        int totalDecrease = getTotalDecrease(conditions);
        return product.getPrice() * (100 - totalDecrease) / 100;
    }

    private int getTotalDecrease(Set<Condition> conditions){
        int totalDecrease = 0;
        int baseDecrease = 0;

        for (Condition condition : conditions) {
            if (condition.getType().equals(ConditionType.SEALED))
                return condition.getPercentDecrease();

            if (condition.getType().equals(ConditionType.OVERALL) ||
                    condition.getType().equals(ConditionType.SCREEN) ||
                    condition.getType().equals(ConditionType.BATTERY)) {
                baseDecrease += condition.getPercentDecrease();
            } else {
                totalDecrease += condition.getPercentDecrease();
            }
        }

        if (baseDecrease < minDecreasedValue) {
            baseDecrease = minDecreasedValue;
        }

        totalDecrease += baseDecrease;

        return Math.min(totalDecrease, maxDecreasedValue);
    }


    @Override
    public QuotingItem getQuotingPrice(GetQuotingPriceRequest request) {
        Product product = productService.findById(request.getProductId());
        Set<Condition> conditions = getConditionsByIds(request.getConditionIds());
        double price = getPrice(product, conditions);
        int percentStatus = 100 - getTotalDecrease(conditions);
        return QuotingItem.builder()
                .product(product)
                .conditions(conditions)
                .price(price)
                .percentStatus(percentStatus)
                .build();
    }

    @Override
    public QuotingItem add(QuotingItemRequest request) throws JsonProcessingException {
        Customer customer = Customer.builder()
                .name(request.getCustomerName())
                .email(request.getEmail())
                .address(request.getAddress())
                .bankName(request.getBankName())
                .accountNumber(request.getAccountNumber())
                .build();

        customer = customerService.add(customer);

        Product product = productService.findById(request.getProductId());

        Set<Condition> conditions = getConditionsByIds(request.getConditionIds());
        double price = getPrice(product, conditions);
        int percentStatus = 100 - getTotalDecrease(conditions);

        QuotingItem quotingItem = quotingItemRepository.save(QuotingItem.builder()
                .quotingItemId(UUID.randomUUID().toString())
                .product(product)
                .conditions(conditions)
                .customer(customer)
                .inProcess(false)
                .price(price)
                .percentStatus(percentStatus)
                .build());

        template.convertAndSend("recycling_initial", quotingItem.getQuotingItemId());


        return quotingItem;
    }

    @Override
    public QuotingItem findById(String quotingItemId) {
        if (quotingItemId == null)
            throw new BadRequestException("quotingItemId can not be null");
        return quotingItemRepository.findById(quotingItemId)
                .orElseThrow(() -> new NotFoundException("quoting item not found"));
    }

    @Override
    public List<QuotingItem> findAll() {
        return quotingItemRepository.findAll();
    }

    @Override
    public Boolean existByQuotingItemId(String quotingItemId) {
        return quotingItemRepository.existsById(quotingItemId);
    }
}
