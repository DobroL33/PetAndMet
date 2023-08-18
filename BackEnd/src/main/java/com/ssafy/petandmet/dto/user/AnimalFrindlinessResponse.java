package com.ssafy.petandmet.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalFrindlinessResponse {
    private int status;
    private Long percent;

}
