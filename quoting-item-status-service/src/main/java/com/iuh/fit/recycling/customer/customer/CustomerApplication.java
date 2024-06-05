package com.iuh.fit.recycling.customer.customer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@SpringBootApplication
public class CustomerApplication {

    public static void main(String[] args) {
//        SpringApplication.run(CustomerApplication.class, args);
        LocalDateTime currentDateTime = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        String formattedDateTime = currentDateTime.format(formatter);
        System.out.println("Formatted LocalDateTime: " + formattedDateTime);

        LocalDateTime dateTime = LocalDateTime.parse(formattedDateTime, formatter);
        System.out.println("Parsed LocalDateTime: " + dateTime.getMonth());

    }


}
