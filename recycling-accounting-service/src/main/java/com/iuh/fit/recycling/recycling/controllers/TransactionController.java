package com.iuh.fit.recycling.recycling.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.fit.recycling.recycling.entities.ResellItem;
import com.iuh.fit.recycling.recycling.entities.Transaction;
import com.iuh.fit.recycling.recycling.services.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/transaction")
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/items")
    public ResponseEntity<List<Transaction>> findAll(){
        return ResponseEntity.ok(transactionService.findAll());
    }

    @GetMapping("/item")
    public ResponseEntity<Transaction> findByQuotingItemId(@RequestParam(name = "quoting_item_id") String quotingItemId){
        return ResponseEntity.ok(transactionService.findByQuotingItemId(quotingItemId));
    }

    @PostMapping("/new-item")
    public ResponseEntity<Transaction> newTransacton(@RequestParam(name = "quoting_item_id") String quotingItemId) throws JsonProcessingException {
        return ResponseEntity.ok(transactionService.addNewTransaction(quotingItemId));
    }
}
