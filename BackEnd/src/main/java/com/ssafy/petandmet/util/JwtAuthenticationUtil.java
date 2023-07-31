package com.ssafy.petandmet.util;

import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.jwt.Token;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;

@RequiredArgsConstructor
@Slf4j
@Component
public class JwtAuthenticationUtil {

    @Value("${spring.jwt.secret}")
    private String secretKey;
    @Value("${spring.jwt.token.access-expiration-time}")
    private long accessTokenExpirationTime;
    @Value("${spring.jwt.token.refresh-expiration-time}")
    private long refreshTokenExpirationTime;

    @PostConstruct
    protected void init() {
        log.debug(secretKey);
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public Token generateToken(User user) {
        Claims claims = Jwts.claims().setSubject(user.getUuid());
        claims.put("role_type", user.getRoleType().toString());
        Date now = new Date();

        //Access Token
        String accessToken = Jwts.builder()
                .setClaims(claims) //payload 저장
                .setIssuedAt(now) //토큰 발행시간 정보
                .setExpiration(new Date(now.getTime() + accessTokenExpirationTime)) //만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey) // 암호화 알고리즘, 암호키
                .compact();

        //refresh Token
        String refreshToken = Jwts.builder()
                .setClaims(claims) //payload 저장
                .setIssuedAt(now) //토큰 발행시간 정보
                .setExpiration(new Date(now.getTime() + refreshTokenExpirationTime)) //만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey) // 암호화 알고리즘, 암호키
                .compact();

        return Token.builder().accessToken(accessToken).refreshToken(refreshToken).build();
    }
}