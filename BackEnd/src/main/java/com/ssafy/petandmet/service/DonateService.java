package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.*;
import com.ssafy.petandmet.dto.donate.CreateDonateRequest;
import com.ssafy.petandmet.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class DonateService {

    private final DonateRepository donateRepository;
    private final CenterItemRepository centerItemRepository;
    private final CenterRepository centerRepository;
    private final UserRepository userRepository;
    private final AnimalRepository animalRepository;

    public Long add(CreateDonateRequest request) {
        Center center = centerRepository.findById(request.getCenterUuid()).get();
        User user = userRepository.findById(request.getUserUuid()).get();
        Animal animal = animalRepository.findById(request.getAnimalUuid()).get();
        Optional<CenterItem> item = centerItemRepository.findById(request.getItemId());

        Donate donate = Donate.builder()
                .user(user)
                .center(center)
                .animal(animal)
                .price(request.getDonatePrice())
                .donateDate(LocalDateTime.now())
                .centerItem(item.get())
                .build();

        Donate save = donateRepository.save(donate);

        return save.getId();
    }

    public List<CenterItem> findPossibleItem(String uuid) {
        return centerItemRepository.findAllByCenterId(uuid);
    }

    public List<Donate> findDonate(String uuid) {
        return donateRepository.findAllByUserId(uuid);
    }

    public List<Donate> findResponseDonate(String uuid) {
        return donateRepository.findAllByCenterId(uuid);
    }
}
