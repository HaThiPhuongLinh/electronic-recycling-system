package com.iuh.fit.recycling.quoting.services.impl;

import com.iuh.fit.recycling.quoting.entities.Product;
import com.iuh.fit.recycling.quoting.exception.BadRequestException;
import com.iuh.fit.recycling.quoting.exception.NotFoundException;
import com.iuh.fit.recycling.quoting.repositories.ProductRepository;
import com.iuh.fit.recycling.quoting.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    public Product findById(Long id) {
        if (id == null)
            throw new BadRequestException("productId is required");

        return  productRepository.findById(id).orElseThrow(() ->
            new NotFoundException("product not found")
        );
    }

    @Override
    public List<Product> findBySeries(String series) {
        if (series == null)
            return productRepository.findAll();
        else
            return productRepository.findAllBySeries(series);
    }

    @Override
    public Product add(Product product) {

        if (product == null){
            throw new BadRequestException("product can not be null");
        }

        if (!product.isValidInformation()){
            throw new BadRequestException("product information is required");
        }

        product.setProductId(null);

        return productRepository.save(product);
    }

    @Override
    public Product update(Product product) {
        if (product == null){
            throw new BadRequestException("product can not be null");
        }

        if (product.getProductId() == null || product.getName() == null || product.getPrice() == null || product.getImageUrl() == null){
            throw new BadRequestException("product information is required");
        }

        return productRepository.save(product);
    }

    @Override
    public void delete(Long productId) {
        Product product = findById(productId);
        productRepository.delete(product);
    }
}
