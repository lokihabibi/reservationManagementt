package com.example.demo.ContollersPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.ModelsPackage.Equipment;
import com.example.demo.ServicesPackage.EquipmentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/equipment")
@CrossOrigin(origins = "*")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    // Create a new equipment
    @PostMapping
    public ResponseEntity<Equipment> createEquipment(@RequestBody Equipment equipment) {
        Equipment createdEquipment = equipmentService.createEquipment(equipment);
        return ResponseEntity.ok(createdEquipment);
    }

    // Get all equipment
    @GetMapping
    public ResponseEntity<List<Equipment>> getAllEquipments() {
        List<Equipment> equipments = equipmentService.getAllEquipments();
        return ResponseEntity.ok(equipments);
    }

    // Get equipment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getEquipmentById(@PathVariable Long id) {
        Optional<Equipment> equipment = equipmentService.getEquipmentById(id);
        return equipment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update equipment
    @PutMapping("/{id}")
    public ResponseEntity<Equipment> updateEquipment(@PathVariable Long id, @RequestBody Equipment equipment) {
        equipment.setId_equipment(id);
        Equipment updatedEquipment = equipmentService.updateEquipment(equipment);
        return ResponseEntity.ok(updatedEquipment);
    }

    // Delete equipment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEquipment(@PathVariable Long id) {
        equipmentService.deleteEquipment(id);
        return ResponseEntity.noContent().build();
    }

    // Manager-specific endpoints
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<Equipment>> getEquipmentByManager(@PathVariable Long managerId) {
        List<Equipment> equipments = equipmentService.getEquipmentsByManagerId(managerId);
        return ResponseEntity.ok(equipments);
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<Equipment> updateEquipmentAvailability(
            @PathVariable Long id,
            @RequestParam String availability) {
        Optional<Equipment> equipmentOpt = equipmentService.getEquipmentById(id);
        if (equipmentOpt.isPresent()) {
            Equipment equipment = equipmentOpt.get();
            equipment.setAvailability(availability);
            Equipment updatedEquipment = equipmentService.updateEquipment(equipment);
            return ResponseEntity.ok(updatedEquipment);
        }
        return ResponseEntity.notFound().build();
    }
}
