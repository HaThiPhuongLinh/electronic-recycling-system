package com.iuh.fit.recycling.quoting.repositories;

import com.iuh.fit.recycling.quoting.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllBySeriesAndActiveIsTrue(String series);

    List<Product> findAllByActiveIsTrue();

}
