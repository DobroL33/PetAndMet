package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.dto.user.EmailAuthentication;
import org.springframework.data.repository.CrudRepository;

public interface EmailAuthenticationRepository extends CrudRepository<EmailAuthentication, String> {
}