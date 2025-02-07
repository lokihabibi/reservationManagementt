package com.example.demo.ModelsPackage;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "terrain")
public class Terrain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_terrain")
    private Long id_terrain;
    
    @Column(name = "name")
    private String name;
    
    @Column(name = "location")
    private String location;
    
    @Column(name = "prix_heur")
    private double prix_heur;
    
    @Column(name = "availability")
    private String availability;
    
    @Column(name = "desc_terrain")
    private String desc_terrain;
    
    @Column(name = "image_terrain")
    private String image_terrain;
    
    @Column(name = "manager_id")
    private Long managerId;

    // Getters and Setters
    public Long getId_terrain() {
        return id_terrain;
    }

    public void setId_terrain(Long id_terrain) {
        this.id_terrain = id_terrain;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getPrix_heur() {
        return prix_heur;
    }

    public void setPrix_heur(double prix_heur) {
        this.prix_heur = prix_heur;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }


    public String getDesc_terrain() {
        return desc_terrain;
    }

    public void setDesc_terrain(String desc_terrain) {
        this.desc_terrain = desc_terrain;
    }

    public String getImage_terrain() {
        return image_terrain;
    }

    public void setImage_terrain(String image_terrain) {
        this.image_terrain = image_terrain;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }
}
