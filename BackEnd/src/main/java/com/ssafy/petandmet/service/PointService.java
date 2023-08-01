package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Point;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.charge.PointChargeDto;
import com.ssafy.petandmet.repository.PointRepository;
import com.ssafy.petandmet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PointService {

    private final UserRepository userRepository;

    private final PointRepository pointRepository;

    public void chargePoint(PointChargeDto pointChargeDto) {

        Optional<User> user = userRepository.findById(pointChargeDto.getId());

        if (!user.isPresent()) {
            return;
        }

        Point point = Point.builder()
                .pointAmount(pointChargeDto.getAmount())
                .pointDataTime(LocalDateTime.now())
                .build();

        user.get().setPoint(point);
        pointRepository.save(point);
    }
}
