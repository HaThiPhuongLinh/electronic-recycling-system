package com.iuh.fit.recycling.recycling.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.iuh.fit.recycling.recycling.entities.Transaction;

import java.util.List;

public interface TransactionService {
    List<Transaction> findAll();
    Transaction findByQuotingItemId(String quotingItemId);
    Transaction addNewTransaction(String quotingItemId) throws JsonProcessingException;
}
