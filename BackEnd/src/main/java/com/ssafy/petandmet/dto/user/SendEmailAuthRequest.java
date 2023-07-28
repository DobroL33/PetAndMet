package com.ssafy.petandmet.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class SendEmailAuthRequest {
    private String email;
    private int code;
}