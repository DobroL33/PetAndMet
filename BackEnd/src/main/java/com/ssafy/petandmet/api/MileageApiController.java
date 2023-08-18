package com.ssafy.petandmet.api;

import com.ssafy.petandmet.dto.charge.PointRequestDto;
import com.ssafy.petandmet.service.PointService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class MileageApiController {

    private final PointService pointService;

    @PostMapping("api/v1/mileage/charge")
    @Operation(summary = "마일리지 충전", description = "마일리지를 충전합니다.")
    public void chargePoint(@RequestBody PointRequestDto request) {
        pointService.chargePoint(request);
    }

    @PostMapping("api/v1/mileage/reduce")
    @Operation(summary = "마일리지 감소", description = "후원을 하면 사용자의 마일리지가 감소됩니다.")
    public void reducePoint(@RequestBody PointRequestDto request) {
        pointService.reducePoint(request);
    }
}
