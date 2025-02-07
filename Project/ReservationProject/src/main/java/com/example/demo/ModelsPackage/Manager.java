package com.example.demo.ModelsPackage;

import jakarta.persistence.*;

@Entity
@Table(name = "manager")
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idManager")
    private Integer idManager;

    @Column(name = "managed_terrains")
    private String managedTerrains;

    @Column(name = "managed_equipments")
    private String managedEquipments;

    // Default constructor
    public Manager() {}

    // Getters and setters
    public Integer getIdManager() {
        return idManager;
    }

    public void setIdManager(Integer idManager) {
        this.idManager = idManager;
    }

    public String getManagedTerrains() {
        return managedTerrains;
    }

    public void setManagedTerrains(String managedTerrains) {
        this.managedTerrains = managedTerrains;
    }

    public String getManagedEquipments() {
        return managedEquipments;
    }

    public void setManagedEquipments(String managedEquipments) {
        this.managedEquipments = managedEquipments;
    }
}

