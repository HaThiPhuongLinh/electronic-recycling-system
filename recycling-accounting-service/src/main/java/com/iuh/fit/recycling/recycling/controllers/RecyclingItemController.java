package com.iuh.fit.recycling.recycling.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.fit.recycling.recycling.entities.RecyclingItem;
import com.iuh.fit.recycling.recycling.models.RecyclingItemRequest;
import com.iuh.fit.recycling.recycling.services.RecyclingItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/recycling")
public class RecyclingItemController {
    private final RecyclingItemService recyclingItemService;

    @GetMapping("/items")
    public ResponseEntity<List<RecyclingItem>> findAll(){
        return ResponseEntity.ok(recyclingItemService.findAll());
    }

    @GetMapping("/item")
    public ResponseEntity<RecyclingItem> findByQuotingItemId(@RequestParam(name = "quoting_item_id") String quotingItemId){
        return ResponseEntity.ok(recyclingItemService.findByQuotingItemId(quotingItemId));
    }

    @PostMapping("/new-item")
    public ResponseEntity<RecyclingItem> newItem(@RequestBody RecyclingItemRequest request) throws JsonProcessingException {
        return ResponseEntity.ok(recyclingItemService.addNewRecyclingItem(request));
    }
}
