package com.klef.soa.docker.configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI rideSharingOpenAPI() {
        return new OpenAPI().info(new Info()
                .title("Ride Sharing Trip API - 2400030159")
                .version("1.0")
                .description("REST API to add, view and delete ride sharing trips"));
    }
}
