package com.iuh.fit.recycling.quoting.services.impl;

import com.iuh.fit.recycling.quoting.entities.Customer;
import com.iuh.fit.recycling.quoting.exception.BadRequestException;
import com.iuh.fit.recycling.quoting.exception.NotFoundException;
import com.iuh.fit.recycling.quoting.repositories.CustomerRepository;
import com.iuh.fit.recycling.quoting.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;

    @Override
    public List<Customer> findAll() {
        return customerRepository.findAll();
    }

    @Override
    public Customer findById(Long id) {

        if (id == null)
            throw new BadRequestException("CustomerId is required");

        return customerRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Customer is not found"));

    }

    @Override
    public Customer add(Customer customer) {
        if (customer == null)
            throw new BadRequestException("customer can not be null");

        if (!customer.isValidInformation())
            throw new BadRequestException("Customer information is required");

        customer.setCustomerId(null);
        return customerRepository.save(customer);
    }

    @Override
    public Customer update(Customer customer) {
        if (customer == null)
            throw new BadRequestException("customer can not be null");

        if (customer.getCustomerId() == null || !customer.isValidInformation())
            throw new BadRequestException("Customer information is required");

        return customerRepository.save(customer);
    }

    @Override
    public void delete(Long id) {
        Customer customer = findById(id);
        customerRepository.delete(customer);
    }
}
