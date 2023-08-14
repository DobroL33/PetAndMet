package com.ssafy.petandmet.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserLoginResponse {
    private String message;
    private int status;
    private String token;
    @JsonProperty("center_uuid")
    private String centerUuid;
}
