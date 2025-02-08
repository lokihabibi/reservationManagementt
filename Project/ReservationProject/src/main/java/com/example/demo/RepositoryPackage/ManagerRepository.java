package com.example.demo.RepositoryPackage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.ModelsPackage.Manager;

@Repository
public interface ManagerRepository extends JpaRepository<Manager, Integer> {
}
