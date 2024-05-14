package com.iuh.fit.recycling.itemstatus.repositories;

import com.iuh.fit.recycling.itemstatus.entities.ItemStatus;
import com.iuh.fit.recycling.itemstatus.entities.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemStatusRepository extends JpaRepository<ItemStatus, Long> {
    List<ItemStatus> findAllByQuotingItemQuotingItemId(String quotingItemId);
}
