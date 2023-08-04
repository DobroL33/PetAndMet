package com.ssafy.petandmet.dto.user;

import lombok.Data;

@Data
public class AnimalFrindlinessResponse {
    private Long percent;

    public AnimalFrindlinessResponse(Long percent) {
        this.percent = percent;
    }
}
