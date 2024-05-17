package com.iuh.fit.recycling.receiving.repositories;

import com.iuh.fit.recycling.receiving.entities.ReceivedItem;
import com.iuh.fit.recycling.receiving.entities.ReceivedStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReceivedItemRepository extends JpaRepository<ReceivedItem, Long> {
    Optional<ReceivedItem> findByQuotingItemId(String quotingItemId);

    List<ReceivedItem> findAllByStatus(ReceivedStatus status);

}
