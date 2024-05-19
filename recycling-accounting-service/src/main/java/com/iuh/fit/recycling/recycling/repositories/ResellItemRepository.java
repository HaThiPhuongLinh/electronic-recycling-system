package com.iuh.fit.recycling.recycling.repositories;

import com.iuh.fit.recycling.recycling.entities.ResellItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ResellItemRepository extends JpaRepository<ResellItem, Long> {
    Optional<ResellItem> findByItemReceivedItemQuotingItemId(String quotingItemId);
}
