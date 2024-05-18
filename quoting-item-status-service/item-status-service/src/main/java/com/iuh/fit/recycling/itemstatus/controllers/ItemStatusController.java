package com.iuh.fit.recycling.itemstatus.controllers;

import com.iuh.fit.recycling.itemstatus.models.responses.ItemStatusResponse;
import com.iuh.fit.recycling.itemstatus.services.ItemStatusService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/itemstatus")
public class ItemStatusController {

    private final ItemStatusService itemStatusService;

    @GetMapping("/{quotingItemId}")
    public ResponseEntity<ItemStatusResponse> getState(@PathVariable String quotingItemId){
        return ResponseEntity.ok(itemStatusService.getByQuotingItemId(quotingItemId));
    }

}
