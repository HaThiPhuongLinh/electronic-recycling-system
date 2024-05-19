package com.iuh.fit.recycling.recycling.repositories;

import com.iuh.fit.recycling.recycling.entities.RecyclingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecyclingItemRepository extends JpaRepository<RecyclingItem, Long> {
    Optional<RecyclingItem> findByItemReceivedItemQuotingItemId(String quotingItemId);

}
