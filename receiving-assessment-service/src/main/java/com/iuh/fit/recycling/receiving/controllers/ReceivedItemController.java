package com.iuh.fit.recycling.receiving.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.fit.recycling.receiving.entities.ReceivedItem;
import com.iuh.fit.recycling.receiving.entities.ReceivedStatus;
import com.iuh.fit.recycling.receiving.models.ReceivedItemRequest;
import com.iuh.fit.recycling.receiving.services.ReceivedItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/received")
public class ReceivedItemController {
    private final ReceivedItemService receivedItemService;

    @GetMapping("/items")
    public ResponseEntity<List<ReceivedItem>> findAll(@RequestParam(name = "status", required = false)ReceivedStatus status){
        if (status == null)
            return ResponseEntity.ok(receivedItemService.findAll());
        else
            return ResponseEntity.ok(receivedItemService.findAllByStatus(status));
    }

    @GetMapping("item")
    public ResponseEntity<ReceivedItem> findByQuotingItemId(@RequestParam(name = "quoting_item_id") String quotingItemId){
        return ResponseEntity.ok(receivedItemService.findByQuotingItemId(quotingItemId));
    }

    @PostMapping("/new-item")
    public ResponseEntity<ReceivedItem> receiveItem(@RequestParam(name = "quoting_item_id") String quotingItemId) throws JsonProcessingException {
        return ResponseEntity.ok(receivedItemService.receive(quotingItemId));
    }

    @PostMapping("/update")
    public ResponseEntity<ReceivedItem> updateInformation(@RequestParam("payload") String receivedItemRequestString,
                                                          @RequestParam("files")List<MultipartFile> files
    ) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        ReceivedItemRequest request = mapper.readValue(receivedItemRequestString, ReceivedItemRequest.class);

        return ResponseEntity.ok(receivedItemService.updateReceivedItemProof(request, files));


    }

}
