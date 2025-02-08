package com.example.demo.ModelsPackage;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "admin")
public class Admin {
		@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "idAdmin")
	    private Long idAdmin;
	
		 @OneToOne
		  @MapsId  // Ensures idManager = id_user
		  @JoinColumn(name = "idAdmin", referencedColumnName = "id_user") // Foreign key reference
		  private User user;
		 
		    public Admin() {}

			public Long getIdAdmin() {
				return idAdmin;
			}

			public void setIdAdmin(Long idAdmin) {
				this.idAdmin = idAdmin;
			}

			public User getUser() {
				return user;
			}

			public void setUser(User user) {
				this.user = user;
			}
		    

}
