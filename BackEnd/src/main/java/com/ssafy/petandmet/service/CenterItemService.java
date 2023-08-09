package com.ssafy.petandmet.service;


import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.CenterItem;
import com.ssafy.petandmet.dto.centerItem.CenterItemResponse;
import com.ssafy.petandmet.dto.centerItem.CreateCenterItemRequest;
import com.ssafy.petandmet.dto.centerItem.UpdateCenterItemRequest;
import com.ssafy.petandmet.repository.CenterItemRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CenterItemService {

    private final CenterItemRepository centerItemRepository;

    private final CenterRepository centerRepository;

    @Transactional
    public void addItem(CreateCenterItemRequest request) {
        Center center = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        CenterItem centerItem = CenterItem.builder()
                .center(center)
                .itemName(request.getItemName())
                .itemUrl(request.getItemUrl())
                .targetPrice(request.getItemTargetPrice())
                .build();

        centerItemRepository.save(centerItem);
    }

    @Transactional
    public void removeItem(Long id) {
        centerItemRepository.deleteById(id);
    }

    @Transactional
    public void updateItem(UpdateCenterItemRequest request) {
        CenterItem centerItem = centerItemRepository.findById(request.getCenterItemId()).orElseThrow(() -> {
            throw new NullPointerException();
        });;

        centerItem.setItemName(request.getItemName());
        centerItem.setItemUrl(request.getItemUrl());
        centerItem.setTargetPrice(request.getItemTargetPrice());
    }

    public List<CenterItemResponse> findCenterItem(String uuid) {
        return centerItemRepository.findAllByCenterId(uuid);
    }
}
