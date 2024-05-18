package com.iuh.fit.recycling.recycling.repositories;

import com.iuh.fit.recycling.recycling.entities.RecyclingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecyclingItemRepository extends JpaRepository<RecyclingItem, Long> {


}
