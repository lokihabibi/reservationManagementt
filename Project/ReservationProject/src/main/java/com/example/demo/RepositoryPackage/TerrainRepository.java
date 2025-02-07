package com.example.demo.RepositoryPackage;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.ModelsPackage.Terrain;
@Repository
public interface TerrainRepository extends JpaRepository<Terrain, Long> {
    List<Terrain> findByManagerId(Long managerId);
}