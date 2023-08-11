package com.ssafy.petandmet.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserMileageResponse {

    private String message;
    private int status;
    private Long mileage;
}
