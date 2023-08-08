package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.CenterItem;
import com.ssafy.petandmet.domain.Live;
import com.ssafy.petandmet.dto.live.CreateLiveRequest;
import com.ssafy.petandmet.dto.live.UpdateLiveRequest;
import com.ssafy.petandmet.repository.AnimalRepository;
import com.ssafy.petandmet.repository.CenterItemRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import com.ssafy.petandmet.repository.LiveRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LiveService {

    private final LiveRepository liveRepository;

    private final CenterItemRepository centerItemRepository;

    private final AnimalRepository animalRepository;
    private final CenterRepository centerRepository;


    public Page<Live> findLiveList(Pageable pageable) {
        return liveRepository.findAll(pageable);
    }

    public List<Live>  findLiveListByCenter(String uuid) {
        return liveRepository.findLiveListByCenter(uuid);
    }

    public Live findLiveDetail(Long id) {
        return liveRepository.findLiveDetail(id);
    }

    public void createLive(CreateLiveRequest request) {

        Center center = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });
        Animal animal = animalRepository.findById(request.getAnimalUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        List<CenterItem> centerItems = request.getCenterItemId().stream()
                .map(o -> {
                    CenterItem centerItem = centerItemRepository.findById(o).orElseThrow(() -> {
                        throw new NullPointerException();
                    });
                    return centerItem;
                })
                .collect(Collectors.toList());

        Live live = Live.builder()
                .center(center)
                .animal(animal)
                .sessionName(request.getSessionName())
                .build();
        live.setCenterItem(centerItems);

        liveRepository.save(live);
    }

    public void deleteLive(Long id) {
        Live live = liveRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });

        liveRepository.delete(live);
    }

    public void updateLive(UpdateLiveRequest request) {
        Live live = liveRepository.findById(request.getId()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        if (request.getAnimalUuid() != null) {
            Animal animal = animalRepository.findById(request.getAnimalUuid()).orElseThrow(() -> {
                throw new NullPointerException();
            });
            live.setAnimal(animal);
        }
        if (request.getCenterItemId() != null) {
            List<CenterItem> centerItems = request.getCenterItemId().stream()
                    .map(o -> {
                        CenterItem centerItem = centerItemRepository.findById(o).orElseThrow(() -> {
                            throw new NullPointerException();
                        });
                        return centerItem;
                    })
                    .collect(Collectors.toList());
            live.setCenterItem(centerItems);
        }
        live.setSessionName(request.getSessionName());
    }

}
