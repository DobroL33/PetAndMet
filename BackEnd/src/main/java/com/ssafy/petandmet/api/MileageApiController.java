package com.ssafy.petandmet.api;

import com.ssafy.petandmet.dto.charge.PointRequestDto;
import com.ssafy.petandmet.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MileageApiController {

    private final PointService pointService;

    @PostMapping("api/v1/mileage/charge")
    public void chargePoint(@RequestBody PointRequestDto request) {
        pointService.chargePoint(request);
    }

    @PostMapping("api/v1/mileage/reduce")
    public void reducePoint(@RequestBody PointRequestDto request) {
        pointService.reducePoint(request);
    }
}
