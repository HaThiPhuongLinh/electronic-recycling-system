package com.iuh.fit.recycling.recycling.controllers;

import com.iuh.fit.recycling.recycling.entities.Accessory;
import com.iuh.fit.recycling.recycling.services.AccessoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/accessory")
public class AccessoryController {

    private final AccessoryService accessoryService;

    @GetMapping
    public ResponseEntity<List<Accessory>> findAll(){
        return ResponseEntity.ok(accessoryService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Accessory> findById(@PathVariable Long id){
        return ResponseEntity.ok(accessoryService.findById(id));
    }


}
