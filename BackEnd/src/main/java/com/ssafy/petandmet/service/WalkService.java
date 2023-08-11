package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.StatusType;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.domain.Walk;
import com.ssafy.petandmet.dto.walk.SignWalkRequest;
import com.ssafy.petandmet.dto.walk.WalkAbleTime;
import com.ssafy.petandmet.dto.walk.WalkTime;
import com.ssafy.petandmet.repository.AnimalRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import com.ssafy.petandmet.repository.UserRepository;
import com.ssafy.petandmet.repository.WalkRepository;
import com.ssafy.petandmet.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class WalkService {
    private final UserRepository userRepository;
    private final CenterRepository centerRepository;
    private final AnimalRepository animalRepository;
    private final WalkRepository walkRepository;

    @Transactional
    public List<WalkAbleTime> getWalkTimes(Map<String, String> map) {
        final Set<Integer> times = new HashSet<>(List.of(1, 2, 3, 4));

        LocalDate date = LocalDate.parse(map.get("date"));
        List<Integer> impossibleTimes = walkRepository.findWalkTimeByUserAndAnimal(map.get("animal_uuid"), map.get("user_uuid"), date);
        log.debug(impossibleTimes.toString());

        List<WalkAbleTime> ableTimes = new ArrayList<>();
        for (int time : times) {
            if (impossibleTimes.contains(time)) {
                ableTimes.add(new WalkAbleTime(time, false));
            } else {
                ableTimes.add(new WalkAbleTime(time, true));
            }
        }
        log.debug(ableTimes.toString());
        return ableTimes;
    }

    @Transactional
    public void signWalk(SignWalkRequest request) {
        Optional<String> userUuid = SecurityUtil.getCurrentUserUuid();
        if (userUuid.isPresent()) {
            Optional<User> user = userRepository.findByUserUuid(userUuid.get());
            Optional<Center> center = centerRepository.findById(request.getCenterUuid());
            Optional<Animal> animal = animalRepository.findById(request.getAnimalUuid());
            if (user.isPresent() && center.isPresent() && animal.isPresent()) {
                if (walkRepository.isExistWalkTime(animal.get().getUuid(), userUuid.get(), center.get().getUuid(), request.getDate(), request.getTime()))
                    throw new IllegalStateException("입력 정보가 잘못되었습니다.");

                Walk walk = Walk.builder()
                        .user(user.get())
                        .animal(animal.get())
                        .center(center.get())
                        .date(request.getDate())
                        .time(request.getTime())
                        .build();
                walkRepository.save(walk);
                return;
            }
        }
        throw new IllegalStateException("입력 정보가 잘못되었습니다.");
    }

    public List<WalkTime> getUserWalkTime(String userUuid) {
        return walkRepository.getUserWalkTime(userUuid);
    }

    public void deleteUserWalkTime(String userUuid, WalkTime request) {
        Optional<Walk> walk = walkRepository.getWalkTime(request.getDate(), request.getTime(), userUuid, request.getAnimalUuid(), request.getCenterUuid());
        if (walk.isEmpty()) {
            throw new IllegalStateException("요청이 올바르지 않습니다.");
        }
        walkRepository.delete(walk.get());
    }

    public Page<WalkTime> getRequestedWalkTIme(String centerUuid, Pageable pageable) {
        return walkRepository.getRequestedWalkTIme(centerUuid, pageable);
    }

    @Transactional
    public void changeWalkStatus(int workId, String statusResult) {
        Optional<Walk> walk = walkRepository.findById(workId);
        walk.get().setStatus(StatusType.valueOf(statusResult));
    }
}
