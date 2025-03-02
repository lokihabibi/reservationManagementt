package com.example.demo.ModelsPackage;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "equipments")
public class Equipment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_equipment")
    private Long id_equipment;
    
    @Column(name = "nom_equipment")
    private String nom_equipment;
    
    @Column(name = "desc_equipment")
    private String desc_equipment;
    
    @Column(name = "availability")
    private String availability;
    
    @Column(name = "image_equip")
    private String image_equip;
    
    @Column(name = "prix")
    private double prix;

    @Column(name = "location")
    private String location;

    @Column(name = "manager_id")
    private Long managerId;
    
   

    public Equipment() {
    }
    
    public Equipment(Long id_equipment, String nom_equipment, String desc_equipment, String availability, String image_equip, double prix) {
        this.id_equipment = id_equipment;
        this.nom_equipment = nom_equipment;
        this.desc_equipment = desc_equipment;
        this.availability = availability;
        this.image_equip = image_equip;
        this.prix = prix;
    }

    public Equipment(Long id_equipment, String nom_equipment, String desc_equipment, String availability, String image_equip, double prix, Long managerId,String location) {
        this.id_equipment = id_equipment;
        this.nom_equipment = nom_equipment;
        this.desc_equipment = desc_equipment;
        this.availability = availability;
        this.image_equip = image_equip;
        this.prix = prix;
        this.managerId = managerId;
        this.location = location;
    }

    // Getters and setters
    public Long getId_equipment() {
        return id_equipment;
    }

    public void setId_equipment(Long id_equipment) {
        this.id_equipment = id_equipment;
    }

    public String getNom_equipment() {
        return nom_equipment;
    }

    public void setNom_equipment(String nom_equipment) {
        this.nom_equipment = nom_equipment;
    }

    public String getDesc_equipment() {
        return desc_equipment;
    }

    public void setDesc_equipment(String desc_equipment) {
        this.desc_equipment = desc_equipment;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }

    public String getImage_equip() {
        return image_equip;
    }

    public void setImage_equip(String image_equip) {
        this.image_equip = image_equip;
    }

    public double getPrix() {
        return prix;
    }

    public void setPrix(double prix) {
        this.prix = prix;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
