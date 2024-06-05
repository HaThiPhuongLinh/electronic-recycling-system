package com.iuh.fit.recycling.recycling.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.fit.recycling.recycling.entities.ResellItem;
import com.iuh.fit.recycling.recycling.services.ResellItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/resell")
public class ResellItemController {

    private final ResellItemService resellItemService;
    @GetMapping("/items")
    public ResponseEntity<List<ResellItem>> findAll(){
        return ResponseEntity.ok(resellItemService.findAll());
    }

    @GetMapping("/item")
    public ResponseEntity<ResellItem> findByQuotingItemId(@RequestParam(name = "quoting_item_id") String quotingItemId){
        return ResponseEntity.ok(resellItemService.findByQuotingItemId(quotingItemId));
    }

    @PostMapping("/new-item")
    public ResponseEntity<ResellItem> newResellItem(@RequestParam(name = "quoting_item_id") String quotingItemId) throws JsonProcessingException {
        return ResponseEntity.ok(resellItemService.addNewResellItem(quotingItemId));
    }

}
