package com.iuh.fit.recycling.recycling;

import com.iuh.fit.recycling.receiving.services.FunctionalAssessmentReceivedItemService;
import com.iuh.fit.recycling.recycling.entities.Accessory;
import com.iuh.fit.recycling.recycling.repositories.AccessoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
@EntityScan({"com.iuh.fit.recycling.receiving.entities", "com.iuh.fit.recycling.recycling.entities"})
//@ComponentScan({"com.iuh.fit.recycling.receiving", "com.iuh.fit.recycling.recycling"})
public class RecyclingAccountingServiceApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(RecyclingAccountingServiceApplication.class, args);
    }

    @Autowired
    AccessoryRepository accessoryRepository;


    @Override
    public void run(String... args) throws Exception {
        List<Accessory> accessories = getListAccessory();
        if (accessoryRepository.count() == 0)
            accessoryRepository.saveAll(accessories);
    }

    private List<Accessory> getListAccessory(){
        List<String> accessoryName = List.of("RAM", "ROM", "Back camera", "Front camera", "PIN");
        List<Accessory> accessories = new ArrayList<Accessory>();
        for (int i = 0 ; i < accessoryName.size(); i++){
            accessories.add(Accessory.builder()
                            .id(Long.valueOf(i+1))
                            .name(accessoryName.get(i))
                            .build());
        }
        return accessories;
    }
}
