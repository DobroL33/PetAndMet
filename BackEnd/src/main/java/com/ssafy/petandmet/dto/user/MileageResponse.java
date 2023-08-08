package com.ssafy.petandmet.dto.user;

import com.ssafy.petandmet.domain.Point;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MileageResponse {

    private Long chargeMileage;
    private LocalDateTime date;

    public MileageResponse(Point point) {
        this.chargeMileage = point.getPointAmount();
        this.date = point.getPointDataTime();
    }
}
