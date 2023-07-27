package com.ssafy.petandmet.dto.jwt;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Token {
    private String grantType;
    private String accessToken;
    private String refreshToken;
    private String key;
}