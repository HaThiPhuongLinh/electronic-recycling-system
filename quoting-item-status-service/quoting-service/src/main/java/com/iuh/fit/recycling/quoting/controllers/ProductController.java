package com.iuh.fit.recycling.quoting.controllers;

import com.iuh.fit.recycling.quoting.entities.Product;
import com.iuh.fit.recycling.quoting.exception.SuccessResponse;
import com.iuh.fit.recycling.quoting.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<Product>> findAll(@RequestParam(name = "series", required = false) String series){
        if (series == null)
            return ResponseEntity.ok(productService.findAll());
        else
            return ResponseEntity.ok(productService.findBySeries(series));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable Long id){
        return ResponseEntity.ok(productService.findById(id));
    }

    @PostMapping
    public ResponseEntity<Product> add(@RequestBody Product product){
        return ResponseEntity.ok(productService.add(product));
    }

    @PutMapping
    public  ResponseEntity<Product> update(@RequestBody Product product) {
        return ResponseEntity.ok(productService.update(product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SuccessResponse> delete(@PathVariable Long id){
        productService.delete(id);
        return ResponseEntity.ok(new SuccessResponse("Delete product successfully"));
    }
}
