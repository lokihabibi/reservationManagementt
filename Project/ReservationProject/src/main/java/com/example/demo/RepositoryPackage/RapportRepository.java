package com.example.demo.RepositoryPackage;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.ModelsPackage.Rapport;

@Repository
public interface RapportRepository extends JpaRepository<Rapport, Long> {
    
    List<Rapport> findByIdUser(Long userId);
    List<Rapport> findByIdManager(Long managerId);
}