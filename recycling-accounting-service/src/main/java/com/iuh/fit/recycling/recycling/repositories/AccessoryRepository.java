package com.iuh.fit.recycling.recycling.repositories;

import com.iuh.fit.recycling.recycling.entities.Accessory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccessoryRepository extends JpaRepository<Accessory, Long> {
}
