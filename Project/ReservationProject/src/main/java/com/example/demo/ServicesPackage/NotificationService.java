package com.example.demo.ServicesPackage;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private final SimpMessagingTemplate messagingTemplate;

    public NotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void sendReservationUpdate(Long reservationId, String status) {
        messagingTemplate.convertAndSend("/topic/reservationStatusChanged", 
            new ReservationNotification(reservationId, status));
    }
}

// DTO for WebSocket messages
class ReservationNotification {
    private Long reservationId;
    private String status;

    public ReservationNotification(Long reservationId, String status) {
        this.reservationId = reservationId;
        this.status = status;
    }

    public Long getReservationId() { return reservationId; }
    public String getStatus() { return status; }
}

