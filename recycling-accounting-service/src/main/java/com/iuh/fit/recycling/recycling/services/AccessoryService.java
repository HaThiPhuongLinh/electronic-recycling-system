package com.iuh.fit.recycling.recycling.services;

import com.iuh.fit.recycling.recycling.entities.Accessory;

import java.util.List;

public interface AccessoryService {
    Accessory add(Accessory accessory);

    Accessory update(Accessory accessory);

    Accessory findById(Long accessoryId);

    List<Accessory> findAll();

    void delete(Long accessoryId);
}
