package com.example.demo.ServicesPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.ModelsPackage.Reservation;
import com.example.demo.RepositoryPackage.ReservationRepository;

import org.springframework.jdbc.core.JdbcTemplate;
import jakarta.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.Date;

@Service
public class ReservationService {
    
    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Create a new reservation with validation
    public Reservation createReservation(Reservation reservation) {
        if (reservationRepository.existsByDateResAndTimeSlot(reservation.getDateRes(), reservation.getTimeSlot())) {
            throw new IllegalStateException("This time slot is already booked for the selected date");
        }

        Integer managerId = null;
        Integer terrainId = reservation.getTerrainId();
        Integer equipmentId = reservation.getEquipmentId();
        
        if (terrainId != null) {
            String terrainSql = "SELECT manager_id FROM terrain WHERE id_terrain = ?";
            managerId = jdbcTemplate.queryForObject(terrainSql, Integer.class, terrainId);
            if (managerId == null) {
                throw new EntityNotFoundException("Terrain with ID " + terrainId + " not found");
            }
        }
        
        if (equipmentId != null) {
            String equipmentSql = "SELECT manager_id FROM equipments WHERE id_equipment = ?";
            Integer equipManagerId = jdbcTemplate.queryForObject(equipmentSql, Integer.class, equipmentId);
            if (equipManagerId == null) {
                throw new EntityNotFoundException("Equipment with ID " + equipmentId + " not found");
            }
            if (managerId != null && !managerId.equals(equipManagerId)) {
                throw new IllegalStateException("Equipment and terrain must be managed by the same manager");
            }
            managerId = equipManagerId;
        }
        
        if (managerId == null) {
            throw new IllegalStateException("Manager could not be determined for the reservation");
        }

        reservation.setManagerId(managerId);
        reservation.setStatus("pending");
        return reservationRepository.save(reservation);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Integer id) {
        return reservationRepository.findById(id);
    }

    public List<Reservation> getPendingReservationsForManager(Integer managerId) {
        List<Reservation> reservations = reservationRepository.findByManagerIdAndStatus(managerId, "pending");
        reservations.forEach(this::populateTerrainAndEquipmentNames);
        return reservations;
    }

    public List<Reservation> getReservationsForClient(Integer clientId) {
        List<Reservation> reservations = reservationRepository.findByUserId(clientId);
        reservations.forEach(this::populateTerrainAndEquipmentNames);
        return reservations;
    }

    private void populateTerrainAndEquipmentNames(Reservation reservation) {
        System.out.println("Populating names for reservation: " + reservation.getIdReservation());
        
        if (reservation.getTerrainId() != null) {
            try {
                String terrainSql = "SELECT name FROM terrain WHERE id_terrain = ?";
                String terrainName = jdbcTemplate.queryForObject(terrainSql, String.class, reservation.getTerrainId());
                reservation.setTerrainName(terrainName);
                System.out.println("Set terrain name: " + terrainName);
            } catch (Exception e) {
                System.err.println("Error getting terrain name: " + e.getMessage());
                reservation.setTerrainName("N/A");
            }
        }
        
        if (reservation.getEquipmentId() != null) {
            try {
                String equipmentSql = "SELECT nom_equipment FROM equipments WHERE id_equipment = ?";
                String equipmentName = jdbcTemplate.queryForObject(equipmentSql, String.class, reservation.getEquipmentId());
                reservation.setEquipmentName(equipmentName);
                System.out.println("Set equipment name: " + equipmentName);
            } catch (Exception e) {
                System.err.println("Error getting equipment name: " + e.getMessage());
                reservation.setEquipmentName("N/A");
            }
        }

        System.out.println("User ID: " + reservation.getUserId());
        if (reservation.getUserId() != null) {
            try {
                String userSql = "SELECT CONCAT(nom_user, ' ', prenom_user) FROM user WHERE id_user = ?";
                String userName = jdbcTemplate.queryForObject(userSql, String.class, reservation.getUserId());
                System.out.println("Found user name: " + userName);
                reservation.setUserName(userName != null ? userName : "N/A");
            } catch (Exception e) {
                System.err.println("Error getting user name: " + e.getMessage());
                reservation.setUserName("N/A");
            }
        } else {
            System.out.println("No user ID found for reservation");
            reservation.setUserName("N/A");
        }
    }

    public Reservation updateReservationStatus(Integer id, String status) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation not found"));

        reservation.setStatus(status);
        reservationRepository.save(reservation);

        // Get user email
        String userEmail = jdbcTemplate.queryForObject(
                "SELECT email_user FROM user WHERE id_user = ?", 
                String.class, 
                reservation.getUserId()
        );

        // Send email
        if (userEmail != null) {
            if ("approved".equals(status)) {
                emailService.sendApprovalEmail(userEmail);
            } else if ("rejected".equals(status)) {
                emailService.sendRejectionEmail(userEmail);
            }
        }

        return reservation;
    }

    
  /*  public Reservation updateReservationStatus(Integer id, String status) {
        if (!isValidStatus(status)) {
            throw new IllegalArgumentException("Invalid status: " + status);
        }
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Reservation not found with id: " + id));
        if ("cancelled".equals(status) && !"pending".equalsIgnoreCase(reservation.getStatus())) {
            throw new IllegalStateException("Only pending reservations can be cancelled");
        }
        reservation.setStatus(status);
        return reservationRepository.save(reservation);
    }*/

    private boolean isValidStatus(String status) {
        return status != null && List.of("pending", "approved", "rejected", "cancelled", "completed").contains(status);
    }

    public boolean isTimeSlotAvailable(Date date, String timeSlot) {
        return !reservationRepository.existsByDateResAndTimeSlot(date, timeSlot);
    }

    public void cancelReservation(Integer id) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Reservation not found with id: " + id));
        if (!"pending".equalsIgnoreCase(reservation.getStatus())) {
            throw new IllegalStateException("Only pending reservations can be cancelled");
        }
        reservationRepository.deleteById(id);
    }

    public void deleteReservation(Integer id) {
        Reservation reservation = reservationRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Reservation not found with id: " + id));
        if ("approved".equalsIgnoreCase(reservation.getStatus())) {
            throw new IllegalStateException("Cannot delete an approved reservation");
        }
        reservationRepository.deleteById(id);
    }
}