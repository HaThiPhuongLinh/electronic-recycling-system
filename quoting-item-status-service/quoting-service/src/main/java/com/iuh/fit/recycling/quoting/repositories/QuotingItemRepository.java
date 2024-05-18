package com.iuh.fit.recycling.quoting.repositories;

import com.iuh.fit.recycling.quoting.entities.QuotingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuotingItemRepository extends JpaRepository<QuotingItem, String> {
}
