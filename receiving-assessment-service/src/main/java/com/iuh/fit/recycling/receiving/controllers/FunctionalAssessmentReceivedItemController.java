package com.iuh.fit.recycling.receiving.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentStatus;
import com.iuh.fit.recycling.receiving.entities.ReceivedItem;
import com.iuh.fit.recycling.receiving.models.FunctionalAssessmentItemRequest;
import com.iuh.fit.recycling.receiving.models.ReceivedItemRequest;
import com.iuh.fit.recycling.receiving.services.FunctionalAssessmentReceivedItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/assessment")
public class FunctionalAssessmentReceivedItemController {

    private final FunctionalAssessmentReceivedItemService functionalAssessmentReceivedItemService;
//    @PostMapping("/new-item")
//    public ResponseEntity<FunctionalAssessmentReceivedItem> initAssessment(@RequestParam(name = "quoting_item_id") String quotingItemId){
//        return ResponseEntity.ok(functionalAssessmentReceivedItemService.initNew(quotingItemId));
//    }

    @GetMapping("/items")
    public ResponseEntity<List<FunctionalAssessmentReceivedItem>> findAll(@RequestParam(name = "status", required = false)FunctionalAssessmentStatus status){
        if (status == null)
            return ResponseEntity.ok(functionalAssessmentReceivedItemService.findAll());
        else
            return ResponseEntity.ok(functionalAssessmentReceivedItemService.findAllByStatus(status));
    }

    @GetMapping("/item")
    public ResponseEntity<FunctionalAssessmentReceivedItem> findByQuotingItemId(@RequestParam(name = "quoting_item_id") String quotingItemId){
        return ResponseEntity.ok(functionalAssessmentReceivedItemService.findByQuotingItemId(quotingItemId));
    }

    @PostMapping("/update")
    public ResponseEntity<FunctionalAssessmentReceivedItem> updateInformation(@RequestParam("payload") String receivedItemRequestString,
                                                          @RequestParam("files")List<MultipartFile> files
    ) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        FunctionalAssessmentItemRequest request = mapper.readValue(receivedItemRequestString, FunctionalAssessmentItemRequest.class);

        return ResponseEntity.ok(functionalAssessmentReceivedItemService.updateFunctionalAssessmentProof(request, files));


    }
}
