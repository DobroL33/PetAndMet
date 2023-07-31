package com.ssafy.petandmet.service;


import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.CenterItem;
import com.ssafy.petandmet.dto.centerItem.CreateCenterItemRequest;
import com.ssafy.petandmet.dto.centerItem.UpdateCenterItemRequest;
import com.ssafy.petandmet.repository.CenterItemRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import jakarta.persistence.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CenterItemService {

    private final CenterItemRepository centerItemRepository;

    private final CenterRepository centerRepository;

    @Transactional
    public Long addItem(CreateCenterItemRequest request) {
        Optional<Center> center = centerRepository.findById(request.getCenterUuid());

        CenterItem centerItem = CenterItem.builder()
                .center(center.get())
                .itemName(request.getItemName())
                .itemUrl(request.getItemUrl())
                .targetPrice(request.getItemTargetPrice())
                .build();

        CenterItem save = centerItemRepository.save(centerItem);

        return save.getId();
    }

    @Transactional
    public void removeItem(Long id) {
        centerItemRepository.deleteById(id);
    }

    @Transactional
    public void updateItem(UpdateCenterItemRequest request) {
        Optional<Center> center = centerRepository.findById(request.getCenterUuid());

        Optional<CenterItem> centerItem = centerItemRepository.findById(request.getCenterItemId());

        if(centerItem.isEmpty()) {
            return;
        }

        centerItem.get().setCenter(center.get());
        centerItem.get().setItemName(request.getItemName());
        centerItem.get().setItemUrl(request.getItemUrl());
        centerItem.get().setTargetPrice(request.getItemTargetPrice());
    }

    public List<CenterItem> findCenterItem(String uuid) {
        return centerItemRepository.findAllByCenterId(uuid);
    }
}
