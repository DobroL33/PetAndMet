package com.ssafy.petandmet.dto.center;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateCenterResponse {

    private int status;
    private String message;
}