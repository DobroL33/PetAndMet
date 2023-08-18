package com.ssafy.petandmet.service;

import com.ssafy.petandmet.config.TokenProvider;
import com.ssafy.petandmet.dto.jwt.Token;
import com.ssafy.petandmet.dto.user.LoginUserRequest;
import com.ssafy.petandmet.repository.RefreshTokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@Service
@RequiredArgsConstructor
@Transactional
public class TestUserService {

    private final TokenProvider tokenProvider;

    private final RefreshTokenRepository refreshTokenRepository;

    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    public Token login(LoginUserRequest request) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = request.toAuthentication();

            Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

            Token token = tokenProvider.testGenerateToken(authentication);

            refreshTokenRepository.save(token);

            return token;
        } catch (NullPointerException e) {
            throw new NullPointerException("사용자가 없습니다.");
        }
    }

    public Token refresh(HttpServletRequest request) {
        String jwtToken = resolveToken(request);

        if (jwtToken != null && !tokenProvider.validateToken(jwtToken)) {
            Token refreshToken = refreshTokenRepository.findById(jwtToken).orElseThrow(() -> {
                throw new NullPointerException();
            });

            Authentication authentication = tokenProvider.getAuthentication(jwtToken);
            Token token = tokenProvider.testRegenerateToken(authentication, refreshToken);

            refreshTokenRepository.delete(refreshToken);
            refreshTokenRepository.save(token);

            return token;
        }

        return null;
    }


    private String resolveToken(HttpServletRequest request) {
        final String BEARER_PREFIX = "Bearer ";
        String bearerToken = request.getHeader(AUTHORIZATION);
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
            return bearerToken.substring(BEARER_PREFIX.length());
        }
        return null;
    }
}
