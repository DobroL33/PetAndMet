package com.ssafy.petandmet.dto.jwt;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@RedisHash(value = "refreshToken", timeToLive = 604800000L)
public class Token {
    @Id
    private String refreshToken;
    private String accessToken;
}