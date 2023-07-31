package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Live;
import com.ssafy.petandmet.repository.LiveRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LiveService {

    private final LiveRepository liveRepository;

    public Page<Live> findLiveList(Pageable pageable) {
        return liveRepository.findAll(pageable);
    }

    public List<Live>  findLiveListByCenter(String uuid) {
        return liveRepository.findLiveListByCenter(uuid);
    }

    public Live findLiveDetail(Long id) {
        return liveRepository.findLiveDetail(id);
    }
}
