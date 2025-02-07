package com.example.demo.ModelsPackage;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "rapport")
public class Rapport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rapport")
    private Long idRapport;
    
    @Column(name = "description")
    private String description;

    @Column(name = "date_rapport")
    private Date dateRapport;

    @Column(name = "id_user")
    private Long idUser;

    @Column(name = "id_manager")
    private Long idManager;

    @Column(name = "id_terrain", nullable = true)
    private Long idTerrain;

    @Column(name = "id_equipment", nullable = true)
    private Long idEquipment;

    @Transient
    private String terrainName;

    @Transient
    private String equipmentName;

    @Transient
    private String userName;

    public Rapport() {
    }

    // Getters and Setters
    public Long getIdRapport() {
        return idRapport;
    }

    public void setIdRapport(Long idRapport) {
        this.idRapport = idRapport;
    }
    
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    
    public Date getDateRapport() {
        return dateRapport;
    }

    public void setDateRapport(Date dateRapport) {
        this.dateRapport = dateRapport;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }

    public Long getIdManager() {
        return idManager;
    }

    public void setIdManager(Long idManager) {
        this.idManager = idManager;
    }

    public Long getIdTerrain() {
        return idTerrain;
    }

    public void setIdTerrain(Long idTerrain) {
        this.idTerrain = idTerrain;
    }

    public Long getIdEquipment() {
        return idEquipment;
    }

    public void setIdEquipment(Long idEquipment) {
        this.idEquipment = idEquipment;
    }

    public String getTerrainName() {
        return terrainName;
    }

    public void setTerrainName(String terrainName) {
        this.terrainName = terrainName;
    }

    public String getEquipmentName() {
        return equipmentName;
    }

    public void setEquipmentName(String equipmentName) {
        this.equipmentName = equipmentName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}