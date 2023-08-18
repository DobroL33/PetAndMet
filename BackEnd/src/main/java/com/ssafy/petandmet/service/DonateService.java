package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.*;
import com.ssafy.petandmet.dto.centerItem.CenterItemResponse;
import com.ssafy.petandmet.dto.donate.CreateAnimalDonateRequest;
import com.ssafy.petandmet.dto.donate.CreateCenterItemDonateRequest;
import com.ssafy.petandmet.exception.MileageException;
import com.ssafy.petandmet.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class DonateService {

    private final DonateRepository donateRepository;
    private final CenterItemRepository centerItemRepository;
    private final CenterRepository centerRepository;
    private final UserRepository userRepository;
    private final AnimalRepository animalRepository;

    public void addAnimalDonate(CreateAnimalDonateRequest request) {

        System.out.println("request.getUserUuid() = " + request.getUserUuid());
        Long findMileage = userRepository.findMileage(request.getUserUuid());

        System.out.println("findMileage = " + findMileage);
        if ( findMileage < request.getDonatePrice() ) {
            throw new MileageException("마일리지를 충전 해 주세요!");
        }

        User user = userRepository.findById(request.getUserUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });
        Center center = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });
        Animal animal = animalRepository.findById(request.getAnimalUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        Donate donate = Donate.builder()
                .user(user)
                .center(center)
                .animal(animal)
                .price(request.getDonatePrice())
                .donateDate(LocalDateTime.now())
                .build();

        donateRepository.save(donate);
    }
    public void addCenterItemDonate(CreateCenterItemDonateRequest request) {
        User user = userRepository.findById(request.getUserUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });
        Animal animal = animalRepository.findById(request.getAnimalUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });
        Center center = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });
        CenterItem item = centerItemRepository.findById(request.getItemId()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        Donate donate = Donate.builder()
                .user(user)
                .animal(animal)
                .center(center)
                .centerItem(item)
                .price(request.getDonatePrice())
                .donateDate(LocalDateTime.now())
                .build();

        donateRepository.save(donate);
    }

    public List<CenterItemResponse> findPossibleItem(String uuid) {
        return centerItemRepository.findAllByCenterId(uuid);
    }

    public List<Donate> findDonate(String uuid) {
        return donateRepository.findAllByUserId(uuid);
    }

    public List<Donate> findResponseDonate(String uuid) {
        return donateRepository.findAllByCenterId(uuid);
    }

    public Long findCenterItemDonateTotalPrice(String uuid, Long id) {
        Long findTotalPrice = donateRepository.findCenterItemDonateTotalPrice(uuid, id);

        if (findTotalPrice == null) {
            return 0L;
        }
        return findTotalPrice;
    }
}
