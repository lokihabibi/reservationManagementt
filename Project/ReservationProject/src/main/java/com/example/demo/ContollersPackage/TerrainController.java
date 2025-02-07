package com.example.demo.ContollersPackage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.ModelsPackage.Terrain;
import com.example.demo.ServicesPackage.TerrainService;

import java.util.List;

@RestController
@RequestMapping("/api/terrains")
@CrossOrigin(origins = "http://localhost:4200")
public class TerrainController {

    @Autowired
    private TerrainService terrainService;

    @PostMapping
    public ResponseEntity<Terrain> createTerrain(@RequestBody Terrain terrain) {
        Terrain createdTerrain = terrainService.createTerrain(terrain);
        return ResponseEntity.ok(createdTerrain);
    }

    @GetMapping
    public ResponseEntity<List<Terrain>> getAllTerrains() {
        List<Terrain> terrains = terrainService.getAllTerrains();
        return ResponseEntity.ok(terrains);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Terrain> getTerrainById(@PathVariable Long id) {
        Terrain terrain = terrainService.getTerrainById(id);
        if (terrain != null) {
            return ResponseEntity.ok(terrain);
        }
        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Terrain> updateTerrain(@PathVariable Long id, @RequestBody Terrain terrain) {
        terrain.setId_terrain(id);
        Terrain updatedTerrain = terrainService.updateTerrain(terrain);
        return ResponseEntity.ok(updatedTerrain);
    }

    @PutMapping("/{id}/availability")
    public ResponseEntity<Terrain> updateTerrainAvailability(
            @PathVariable Long id,
            @RequestParam String availability) {
        Terrain terrain = terrainService.getTerrainById(id);
        if (terrain == null) {
            return ResponseEntity.notFound().build();
        }
        terrain.setAvailability(availability);
        Terrain updatedTerrain = terrainService.updateTerrain(terrain);
        return ResponseEntity.ok(updatedTerrain);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTerrain(@PathVariable Long id) {
        terrainService.deleteTerrain(id);
        return ResponseEntity.noContent().build();
    }

    // Manager-specific endpoints
    @GetMapping("/manager/{managerId}")
    public ResponseEntity<List<Terrain>> getTerrainsByManager(@PathVariable Long managerId) {
        List<Terrain> terrains = terrainService.getTerrainsByManagerId(managerId);
        return ResponseEntity.ok(terrains);
    }
}