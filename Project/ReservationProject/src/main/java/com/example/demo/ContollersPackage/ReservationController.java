package com.example.demo.ContollersPackage;
import org.springframework.web.bind.annotation.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import com.example.demo.ModelsPackage.Reservation;
import com.example.demo.ServicesPackage.ReservationService;

import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "*")
public class ReservationController {
	
	@Autowired
    private ReservationService reservationService;
    

    @PostMapping
    public Reservation createReservation(@RequestBody Reservation reservation) {
        return reservationService.createReservation(reservation);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable Integer id) {
        return reservationService.getReservationById(id).orElseThrow();
    }

    @GetMapping("/manager/{managerId}/pending")
    public List<Reservation> getPendingReservationsForManager(@PathVariable Integer managerId) {
        return reservationService.getPendingReservationsForManager(managerId);
    }

    @GetMapping("/client/{clientId}")
    public List<Reservation> getClientReservations(@PathVariable Integer clientId) {
        return reservationService.getReservationsForClient(clientId);
    }

    @PutMapping("/{id}/status")
    public Reservation updateReservationStatus(@PathVariable Integer id, @RequestParam String status) {
        return reservationService.updateReservationStatus(id, status);
    }

    @GetMapping("/check-availability")
    public Map<String, Boolean> checkTimeSlotAvailability(@RequestParam Date date, @RequestParam String timeSlot) {
        boolean isAvailable = reservationService.isTimeSlotAvailable(date, timeSlot);
        return Map.of("available", isAvailable);
    }

    @DeleteMapping("/{id}/cancel")
    public void cancelReservation(@PathVariable Integer id) {
        reservationService.cancelReservation(id);
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Integer id) {
        reservationService.deleteReservation(id);
    }
}
