package com.iuh.fit.recycling.quoting.services;

import com.iuh.fit.recycling.quoting.entities.Product;
import org.apache.coyote.BadRequestException;

import java.util.List;

public interface ProductService {

    List<Product> findAll();

    Product findById(Long id);

    List<Product> findBySeries(String series);


    Product add(Product product);

    Product update(Product product);

    void delete(Long productId);

}
