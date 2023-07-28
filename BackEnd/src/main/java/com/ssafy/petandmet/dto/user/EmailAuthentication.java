package com.ssafy.petandmet.dto.user;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@RedisHash(value = "emailAuthentication", timeToLive = 300000L)
public class EmailAuthentication {
    @Id
    private String email;
    private int code;
}