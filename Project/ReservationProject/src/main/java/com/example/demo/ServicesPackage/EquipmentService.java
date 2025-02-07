package com.example.demo.ServicesPackage;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.ModelsPackage.Equipment;
import com.example.demo.RepositoryPackage.EquipmentRepository;

import java.util.List;
import java.util.Optional;

@Service
public class EquipmentService {
    
    @Autowired
    private EquipmentRepository equipmentRepository;
    
    // Create a new equipment
    public Equipment createEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);}
    
    // Retrieve all equipment
    public List<Equipment> getAllEquipments() {
        return equipmentRepository.findAll();
    }

    // Retrieve equipment by manager ID
    public List<Equipment> getEquipmentsByManagerId(Long managerId) {
        return equipmentRepository.findByManagerId(managerId);
    }

    // Retrieve equipment by ID
    public Optional<Equipment> getEquipmentById(Long id) {
        return equipmentRepository.findById(id);
    }

    // Update an existing equipment
    public Equipment updateEquipment(Equipment equipment) {
        return equipmentRepository.save(equipment);
    }

    // Delete equipment by ID
    public void deleteEquipment(Long id) {
        equipmentRepository.deleteById(id);
    }
}
