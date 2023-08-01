package com.ssafy.petandmet.dto.charge;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PointChargeDto {

    private String id;
    private Long amount;

}
