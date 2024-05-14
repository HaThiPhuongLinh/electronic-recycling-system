package com.iuh.fit.recycling.quoting.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.fit.recycling.quoting.entities.QuotingItem;
import com.iuh.fit.recycling.quoting.models.GetQuotingPriceRequest;
import com.iuh.fit.recycling.quoting.models.QuotingItemRequest;
import com.iuh.fit.recycling.quoting.services.QuotingItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/quote")
public class QuotingItemController {
    private final QuotingItemService quotingItemService;

    @GetMapping("/get-price")
    public ResponseEntity<QuotingItem> getQuotingPrice(@RequestBody GetQuotingPriceRequest request){
        return ResponseEntity.ok(quotingItemService.getQuotingPrice(request));
    }

    @PostMapping
    public ResponseEntity<QuotingItem> add(@RequestBody QuotingItemRequest request) throws JsonProcessingException {
        return ResponseEntity.ok(quotingItemService.add(request));
    }

    @GetMapping("/{quotingItemId}")
    public ResponseEntity<QuotingItem> findById(@PathVariable String quotingItemId){
        return ResponseEntity.ok(quotingItemService.findById(quotingItemId));
    }

}
