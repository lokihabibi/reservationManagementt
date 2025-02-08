package com.example.demo.RepositoryPackage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.ModelsPackage.Client;

@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
}
