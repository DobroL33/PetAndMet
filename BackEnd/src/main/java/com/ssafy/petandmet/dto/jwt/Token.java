package com.ssafy.petandmet.dto.jwt;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
@RedisHash(value = "accessToken", timeToLive = 604800000L)
public class Token {
    @Id
    private String accessToken;
    private String refreshToken;
}