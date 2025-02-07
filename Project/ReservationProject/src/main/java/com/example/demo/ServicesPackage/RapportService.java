package com.example.demo.ServicesPackage;

import com.example.demo.ModelsPackage.*;
import com.example.demo.RepositoryPackage.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.EntityNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.Date;

@Service
public class RapportService {
    @Autowired
    private RapportRepository rapportRepository;

    @Autowired
    private TerrainRepository terrainRepository;

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private UserRepository userRepository;

    public Rapport createRapport(Rapport rapport) {
        // Validate user exists
        if (!userRepository.existsById(rapport.getIdUser())) {
            throw new EntityNotFoundException("User not found with id: " + rapport.getIdUser());
        }

        // Validate manager exists
        if (rapport.getIdManager() != null && !userRepository.existsById(rapport.getIdManager())) {
            throw new EntityNotFoundException("Manager not found with id: " + rapport.getIdManager());
        }

        // Validate terrain exists if provided
        if (rapport.getIdTerrain() != null && !terrainRepository.existsById(rapport.getIdTerrain())) {
            throw new EntityNotFoundException("Terrain not found with id: " + rapport.getIdTerrain());
        }

        // Validate equipment exists if provided
        if (rapport.getIdEquipment() != null && !equipmentRepository.existsById(rapport.getIdEquipment())) {
            throw new EntityNotFoundException("Equipment not found with id: " + rapport.getIdEquipment());
        }

        rapport.setDateRapport(new Date());
        return rapportRepository.save(rapport);
    }

    public List<Rapport> getAllRapports() {
        List<Rapport> rapports = rapportRepository.findAll();
        enrichRapportsWithNames(rapports);
        return rapports;
    }

    public List<Rapport> getRapportsByUserId(Long userId) {
        List<Rapport> rapports = rapportRepository.findByIdUser(userId);
        enrichRapportsWithNames(rapports);
        return rapports;
    }

    public List<Rapport> getRapportsByManagerId(Long managerId) {
        List<Rapport> rapports = rapportRepository.findByIdManager(managerId);
        enrichRapportsWithNames(rapports);
        return rapports;
    }

    public Optional<Rapport> getRapportById(Long id) {
        Optional<Rapport> rapport = rapportRepository.findById(id);
        rapport.ifPresent(r -> enrichRapportWithNames(r));
        return rapport;
    }

    private void enrichRapportsWithNames(List<Rapport> rapports) {
        rapports.forEach(this::enrichRapportWithNames);
    }

    private void enrichRapportWithNames(Rapport rapport) {
        if (rapport.getIdTerrain() != null) {
            terrainRepository.findById(rapport.getIdTerrain())
                .ifPresent(terrain -> rapport.setTerrainName(terrain.getName()));
        }
        
        if (rapport.getIdEquipment() != null) {
            equipmentRepository.findById(rapport.getIdEquipment())
                .ifPresent(equipment -> rapport.setEquipmentName(equipment.getNom_equipment()));
        }
        
        if (rapport.getIdUser() != null) {
            userRepository.findById(rapport.getIdUser())
                .ifPresent(user -> rapport.setUserName(user.getPrenomUser() + " " + user.getNomUser()));
        }
    }

    public Rapport updateRapport(Long id, Rapport rapport) {
        if (!rapportRepository.existsById(id)) {
            throw new EntityNotFoundException("Rapport not found with id: " + id);
        }
        rapport.setIdRapport(id);
        return rapportRepository.save(rapport);
    }

    public void deleteRapport(Long id) {
        if (!rapportRepository.existsById(id)) {
            throw new EntityNotFoundException("Rapport not found with id: " + id);
        }
        rapportRepository.deleteById(id);
    }
}