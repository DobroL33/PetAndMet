package com.ssafy.petandmet.api;

import com.ssafy.petandmet.dto.charge.PointChargeDto;
import com.ssafy.petandmet.service.PointService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class ChargeApiController {

    private final PointService pointService;

    @PostMapping("api/v1/charge/point")
    public void chargePoint(@RequestBody PointChargeDto pointChargeDto) {
        pointService.chargePoint(pointChargeDto);
    }

}
