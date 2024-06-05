package com.iuh.fit.recycling.itemstatus;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan({"com.iuh.fit.recycling.quoting.entities", "com.iuh.fit.recycling.itemstatus.entities"})
public class ItemStatusServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ItemStatusServiceApplication.class, args);
    }

}
