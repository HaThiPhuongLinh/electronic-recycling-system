package com.iuh.fit.recycling.recycling.repositories;

import com.iuh.fit.recycling.recycling.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    Optional<Transaction> findByItemReceivedItemQuotingItemId(String quotingItemId);
}
