package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Point;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.charge.PointRequestDto;
import com.ssafy.petandmet.repository.PointRepository;
import com.ssafy.petandmet.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PointService {

    private final UserRepository userRepository;

    private final PointRepository pointRepository;

    public void chargePoint(PointRequestDto request) {

        User user = userRepository.findById(request.getUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        user.setMileage(user.getMileage() + request.getMileage());

        Point point = Point.builder()
                .pointAmount(request.getMileage())
                .pointDataTime(LocalDateTime.now())
                .user(user)
                .build();
        pointRepository.save(point);
    }

    public void reducePoint(PointRequestDto request) {

        User user = userRepository.findById(request.getUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        user.setMileage(user.getMileage() - request.getMileage());

        Point point = Point.builder()
                .pointAmount(-request.getMileage())
                .pointDataTime(LocalDateTime.now())
                .user(user)
                .build();
        pointRepository.save(point);
    }
}
