package com.ssafy.petandmet;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@OpenAPIDefinition(servers = {@Server(url = "http://localhost:8080", description = "Local Server URL"),
        @Server(url = "${server.ec2-url}", description = "EC2 Server URL")})
@SpringBootApplication
public class PetandmetApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetandmetApplication.class, args);
	}

}
