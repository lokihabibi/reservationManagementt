package com.example.demo.ServicesPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    
    @Autowired
    private JavaMailSender mailSender;

    public void sendApprovalEmail(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Reservation Approved");
        message.setText("Dear Client,\n\nYour reservation has been approved.\n\nThank you!");
        mailSender.send(message);
    }

    public void sendRejectionEmail(String toEmail) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Reservation Rejected");
        message.setText("Dear Client,\n\nUnfortunately, your reservation has been rejected.\n\nThank you!");
        mailSender.send(message);
    }         
}