package com.iuh.fit.recycling.recycling.services.impl;

import com.iuh.fit.recycling.receiving.exception.BadRequestException;
import com.iuh.fit.recycling.receiving.exception.NotFoundException;
import com.iuh.fit.recycling.recycling.entities.Accessory;
import com.iuh.fit.recycling.recycling.repositories.AccessoryRepository;
import com.iuh.fit.recycling.recycling.services.AccessoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AccessoryServiceImpl implements AccessoryService {

    private final AccessoryRepository accessoryRepository;
    @Override
    public Accessory add(Accessory accessory) {
        if (accessory == null || accessory.getName() == null || accessory.getName().isEmpty())
            throw new BadRequestException("Accessory name is required");
        accessory.setId(null);
        return accessoryRepository.save(accessory);
    }

    @Override
    public Accessory update(Accessory accessory) {
        if (accessory == null || accessory.getName() == null || accessory.getName().isEmpty())
            throw new BadRequestException("Accessory name is required");
        return accessoryRepository.save(accessory);
    }

    @Override
    public Accessory findById(Long accessoryId) {
        return accessoryRepository.findById(accessoryId)
                .orElseThrow(() ->new NotFoundException("Accessory not found"));
    }

    @Override
    public List<Accessory> findAll() {
        return accessoryRepository.findAll();
    }

    @Override
    public void delete(Long accessoryId) {
        Accessory accessory = findById(accessoryId);
        accessoryRepository.delete(accessory);
    }
}
