package com.iuh.fit.recycling.receiving.repositories;

import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentReceivedItem;
import com.iuh.fit.recycling.receiving.entities.FunctionalAssessmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FunctionalAssessmentReceivedItemRepository extends JpaRepository<FunctionalAssessmentReceivedItem, Long> {
    Optional<FunctionalAssessmentReceivedItem> findByReceivedItemQuotingItemId(String quotingItemId);

    List<FunctionalAssessmentReceivedItem> findAllByStatus(FunctionalAssessmentStatus status);

}
