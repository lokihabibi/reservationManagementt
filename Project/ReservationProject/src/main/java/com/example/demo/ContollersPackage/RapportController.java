package com.example.demo.ContollersPackage;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.ModelsPackage.Rapport;
import com.example.demo.ServicesPackage.RapportService;

import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/rapports")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS})
public class RapportController {
    @Autowired
    private RapportService rapportService;

    @PostMapping
    public ResponseEntity<?> createRapport(@RequestBody Rapport rapport) {
        try {
            Rapport createdRapport = rapportService.createRapport(rapport);
            return ResponseEntity.ok(createdRapport);
        } catch (EntityNotFoundException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "An error occurred while creating the rapport");
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping
    public ResponseEntity<List<Rapport>> getAllRapports() {
        return ResponseEntity.ok(rapportService.getAllRapports());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getRapportById(@PathVariable Long id) {
        try {
            Optional<Rapport> rapport = rapportService.getRapportById(id);
            return rapport.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getRapportsByUser(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(rapportService.getRapportsByUserId(userId));
        } catch (EntityNotFoundException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/manager/{managerId}")
    public ResponseEntity<?> getRapportsByManager(@PathVariable Long managerId) {
        try {
            return ResponseEntity.ok(rapportService.getRapportsByManagerId(managerId));
        } catch (EntityNotFoundException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRapport(@PathVariable Long id, @RequestBody Rapport rapport) {
        try {
            return ResponseEntity.ok(rapportService.updateRapport(id, rapport));
        } catch (EntityNotFoundException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRapport(@PathVariable Long id) {
        try {
            rapportService.deleteRapport(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
}