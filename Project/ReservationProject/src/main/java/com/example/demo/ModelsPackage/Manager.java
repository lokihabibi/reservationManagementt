package com.example.demo.ModelsPackage;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "manager")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "idManager")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idManager")
    private Long idManager;
    

    @OneToOne
    @MapsId  // Ensures idManager = id_user
    @JoinColumn(name = "idManager", referencedColumnName = "id_user") // Foreign key reference
    private User user;


    // Default constructor
    public Manager() {}

    // Getters and setters
    public Long getIdManager() {
        return idManager;
    }

    public void setIdManager(Long idManager) {
        this.idManager = idManager;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

