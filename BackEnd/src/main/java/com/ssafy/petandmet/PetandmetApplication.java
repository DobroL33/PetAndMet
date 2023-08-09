package com.ssafy.petandmet;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(servers = {@Server(url = "https://i9b302.p.ssafy.io", description = "Default Server URL")})
@SpringBootApplication
public class PetandmetApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetandmetApplication.class, args);
	}

}
