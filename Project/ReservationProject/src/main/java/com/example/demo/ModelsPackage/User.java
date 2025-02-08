package com.example.demo.ModelsPackage;

import jakarta.persistence.*;

@Entity	
@Table(name = "user") 
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_user")
    private Long id_user;

    @Column(name = "prenom_user")
    private String prenom_user;

    @Column(name = "password_user")
    private String password_user;

    @Column(name = "email_user")
    private String email_user;

    @Column(name = "nom_user")
    private String nom_user;

    @Column(name = "adresse_user")
    private String adresse_user;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Manager manager;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Client client;

    public Client getClient() {
		return client;
	}

	public void setClient(Client client) {
		this.client = client;
	}

	@Column(name = "tel_user")
    private String tel_user;

    @Column(name = "role")
    private String role = "client"; 

    
    public User() {
        // Required by JPA
    }

    public User(Long id_user, String prenomUser, String passwordUser, String emailUser, String name, String adresseUser,
            String telUser, String role) {
        super();
        this.id_user = id_user;
        this.prenom_user = prenomUser;
        this.password_user = passwordUser;
        this.email_user = emailUser;
        this.nom_user = name;
        this.adresse_user = adresseUser;
        this.tel_user = telUser;
        this.role = (role != null) ? role : "client";  
    }

    public Long getIdUser() {
        return id_user;
    }

    public void setIdUser(Long idUser) {
        this.id_user = idUser;
    }

    public String getPrenomUser() {
        return prenom_user;
    }

    public void setPrenomUser(String prenomUser) {
        this.prenom_user = prenomUser;
    }

    public String getPasswordUser() {
        return password_user;
    }
    
    public Manager getManager() {
        return manager;
    }

    public void setManager(Manager manager) {
        this.manager = manager;
        if (manager != null) {
            manager.setUser(this);
        }
    }

    public void setPasswordUser(String passwordUser) {
        this.password_user = passwordUser;
    }

    public String getEmailUser() {
        return email_user;
    }

    public void setEmailUser(String emailUser) {
        this.email_user = emailUser;
    }
    public String getNomUser() {
        return nom_user;
    }

    public void setNomUser(String nomUser) {
        this.nom_user = nomUser;
    }

    public String getAdresseUser() {
        return adresse_user;
    }

    public void setAdresseUser(String adresseUser) {
        this.adresse_user = adresseUser;
    }

    public String getTelUser() {
        return tel_user;
    }

    public void setTelUser(String telUser) {
        this.tel_user = telUser;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
