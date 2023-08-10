package com.ssafy.petandmet.service;

import com.ssafy.petandmet.dto.walk.WalkTime;
import com.ssafy.petandmet.repository.WalkRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class WalkService {
    private final WalkRepository walkRepository;

    @Transactional
    public List<WalkTime> getWalkTimes(Map<String, String> map) {
        final Set<Integer> times = new HashSet<>(List.of(1, 2, 3, 4));

        LocalDate date = LocalDate.parse(map.get("date"));
        List<Integer> impossibleTimes = walkRepository.findWalkTimeByUserAndAnimal(map.get("animal_uuid"), map.get("user_uuid"), date);
        log.debug(impossibleTimes.toString());

        List<WalkTime> ableTimes = new ArrayList<>();
        for (int time : times) {
            if (impossibleTimes.contains(time)) {
                ableTimes.add(new WalkTime(time, false));
            } else {
                ableTimes.add(new WalkTime(time, true));
            }
        }
        log.debug(ableTimes.toString());
        return ableTimes;
    }
}
