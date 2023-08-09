package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.dto.jwt.Token;
import org.springframework.data.repository.CrudRepository;

public interface RefreshTokenRepository extends CrudRepository<Token, String> {
}