package com.ssafy.petandmet.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserMileageLogResponse {

    private String message;
    private int status;
    private List<MileageResponse> mileages;
}
