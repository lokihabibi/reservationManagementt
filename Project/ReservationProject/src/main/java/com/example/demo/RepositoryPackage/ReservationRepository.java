package com.example.demo.RepositoryPackage;


import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.ModelsPackage.Reservation;
@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
    List<Reservation> findByUserId(Integer userId);
    List<Reservation> findByManagerIdAndStatus(Integer managerId, String status);
    boolean existsByDateResAndTimeSlot(Date dateRes, String timeSlot);
}