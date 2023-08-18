package com.ssafy.petandmet.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.Point;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MileageResponse {

    @JsonProperty("charge_date")
    private LocalDateTime chargeDate;
    private Long mileage;

    public MileageResponse(Point point) {
        this.mileage = point.getPointAmount();
        this.chargeDate = point.getPointDataTime();
    }
}
