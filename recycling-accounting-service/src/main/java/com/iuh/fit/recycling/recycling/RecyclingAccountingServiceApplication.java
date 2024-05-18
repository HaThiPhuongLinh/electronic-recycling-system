package com.iuh.fit.recycling.recycling;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan({"com.iuh.fit.recycling.receiving.entities", "com.iuh.fit.recycling.recycling.entities"})
public class RecyclingAccountingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(RecyclingAccountingServiceApplication.class, args);
    }

}
