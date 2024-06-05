package com.iuh.fit.recycling.quoting.services;

import com.iuh.fit.recycling.quoting.entities.Customer;

import java.util.List;

public interface CustomerService {

    List<Customer> findAll();

    Customer findById(Long id);

    Customer add(Customer customer);

    Customer update(Customer customer);

    void delete(Long id);

}
