package com.example.demo.WebSocket;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Configuration
public class WebSocketBeanConfig {


    @Bean
    @Primary
    public SimpMessagingTemplate simpMessagingTemplate() {
        return new SimpMessagingTemplate((message, timeout) -> {
            // Custom message sending logic if needed
            return true;
        });
    }
}