package com.example.demo.ServicesPackage;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.ModelsPackage.Terrain;
import com.example.demo.RepositoryPackage.TerrainRepository;

import java.util.List;

@Service
public class TerrainService {
    
    @Autowired
    private TerrainRepository terrainRepository;
    //create terrain
    public Terrain createTerrain(Terrain terrain) {
        return terrainRepository.save(terrain);
    }
    //get all terrains
    public List<Terrain> getAllTerrains() {
        return terrainRepository.findAll();
    }
    //get terrains a list of terrains managed by a specific manager.
    public List<Terrain> getTerrainsByManagerId(Long managerId) {
        return terrainRepository.findByManagerId(managerId);
    }
    //get a terrain by its ID
    public Terrain getTerrainById(Long id) {
        return terrainRepository.findById(id).orElse(null);
    }
    //Updates an existing terrain
    public Terrain updateTerrain(Terrain terrain) {
        return terrainRepository.save(terrain);
    }
    // delete terrain
    public void deleteTerrain(Long id) {
        terrainRepository.deleteById(id);
    }
}
