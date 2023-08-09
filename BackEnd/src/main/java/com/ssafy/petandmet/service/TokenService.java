package com.ssafy.petandmet.service;

import com.ssafy.petandmet.dto.jwt.Token;
import com.ssafy.petandmet.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
//@Transactional
public class TokenService {
    private final RefreshTokenRepository refreshTokenRepository;

    public Optional<Token> refreshToken(String accessToken) {
        return refreshTokenRepository.findById(accessToken);
    }
}
