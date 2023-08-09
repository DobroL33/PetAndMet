package com.ssafy.petandmet.dto.charge;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PointRequestDto {

    private String uuid;
    private Long mileage;
}
