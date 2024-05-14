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

    private Set<Condition> getConditionsByIds(List<Long> conditionIds){
        Set<Condition> conditions = new HashSet<Condition>();
        boolean containBattery = false;
        for (Long conditionId : conditionIds){
            Condition condition = conditionService.findById(conditionId);
            if (condition.getType().equals(ConditionType.BATTERY) && containBattery)
                continue;

            if (condition.getType().equals(ConditionType.BATTERY))
                containBattery = true;

            conditions.add(condition);
        }
        return conditions;
    }

    private double getPrice(Product product, Set<Condition> conditions){
        int totalDecrease = 0;
        for (Condition condition : conditions){
            totalDecrease += condition.getPercentDecrease();
        }
        return product.getPrice() * (100 - totalDecrease) / 100;
    }

    @Override
    public QuotingItem getQuotingPrice(GetQuotingPriceRequest request) {
        Product product = productService.findById(request.getProductId());
        Set<Condition> conditions = getConditionsByIds(request.getConditionIds());
        double price = getPrice(product, conditions);
        return QuotingItem.builder()
                .product(product)
                .conditions(conditions)
                .price(price)
                .build();
    }

    @Override
    public QuotingItem add(QuotingItemRequest request) throws JsonProcessingException {
        Customer customer = Customer.builder()
                .name(request.getCustomerName())
                .email(request.getEmail())
                .address(request.getAddress())
                .accountNumber(request.getAccountNumber())
                .build();

        customer = customerService.add(customer);

        Product product = productService.findById(request.getProductId());

        Set<Condition> conditions = getConditionsByIds(request.getConditionIds());
        double price = getPrice(product, conditions);


        QuotingItem quotingItem = quotingItemRepository.save(QuotingItem.builder()
                .quotingItemId(UUID.randomUUID().toString())
                .product(product)
                .conditions(conditions)
                .customer(customer)
                .inProcess(false)
                .price(price)
                .build());

        ObjectMapper mapper = new ObjectMapper();
        String newItemString = mapper.writeValueAsString(quotingItem);

        template.convertAndSend("recycling_initial", quotingItem.getQuotingItemId());


        return quotingItem;
//        return null;
    }

    @Override
    public QuotingItem findById(String quotingItemId) {
        if (quotingItemId == null)
            throw new BadRequestException("quotingItemId can not be null");
        return quotingItemRepository.findById(quotingItemId)
                .orElseThrow(() -> new NotFoundException("quoting item not found"));
    }
}
