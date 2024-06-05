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
        return productRepository.findAllByActiveIsTrue();
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
            return productRepository.findAllByActiveIsTrue();
        else
            return productRepository.findAllBySeriesAndActiveIsTrue(series);
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

        Product existedProduct = findById(product.getProductId());
        existedProduct.setNote(product.getNote() != null ? product.getNote() : existedProduct.getNote());
        existedProduct.setName(product.getName() != null ? product.getName() : existedProduct.getName());
        existedProduct.setPrice(product.getPrice() != null ? product.getPrice() : existedProduct.getPrice());
        existedProduct.setSeries(product.getSeries() != null ? product.getSeries() : existedProduct.getSeries());

        return productRepository.save(existedProduct);
    }

    @Override
    public void delete(Long productId) {
        Product product = findById(productId);
        product.setActive(false);
        productRepository.save(product);
    }
}
