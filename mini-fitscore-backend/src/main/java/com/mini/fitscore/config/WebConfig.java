package com.mini.fitscore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOriginPatterns("https://116f01ef8ff6.ngrok-free.app") // aceita qualquer subdomínio ngrok
                        .allowedMethods("*") // GET, POST, PUT, DELETE etc
                        .allowCredentials(true); // habilita envio de cookies ou credenciais
            }
        };
    }
}
