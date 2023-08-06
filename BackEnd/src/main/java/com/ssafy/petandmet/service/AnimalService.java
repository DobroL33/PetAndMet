package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.dto.animal.CreateAnimalRequest;
import com.ssafy.petandmet.dto.animal.FindAnimalByIdResponse;
import com.ssafy.petandmet.dto.animal.UpdateAnimalRequest;
import com.ssafy.petandmet.repository.AnimalRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;

    private final CenterRepository centerRepository;


    @Transactional
    public String delete(String id) {
        Animal findAnimal = animalRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });;
        animalRepository.delete(findAnimal);
        return id;
    }

    public FindAnimalByIdResponse findOne(String uuid) {

        Animal findAnimal = animalRepository.findById(uuid).orElseThrow(() -> {
            throw new NullPointerException();
        });;

        FindAnimalByIdResponse response = FindAnimalByIdResponse.builder()
                .message("강아지 조회 성공")
                .status("200")
                .name(findAnimal.getName())
                .age(findAnimal.getAge())
                .specie(findAnimal.getSpecie())
                .breed(findAnimal.getBreed())
                .findPlace(findAnimal.getFindPlace())
                .enterDate(findAnimal.getEnterDate())
                .enterAge(findAnimal.getEnterAge())
                .gender(findAnimal.getGender())
                .adoptionStatus(findAnimal.getAdoptionStatus())
                .adotionStartDate(findAnimal.getAdotionStartDate())
                .noticeDate(findAnimal.getNoticeDate())
                .character(findAnimal.getCharacterType())
                .photoUrl(findAnimal.getPhotoUrl())
                .build();

        if(findAnimal.getCenter() != null) {
            Center center = centerRepository.findById(findAnimal.getCenter().getUuid()).orElseThrow(() -> {
                throw new NullPointerException();
            });
            response.setCenterUuid(center.getUuid());
        }

        return response;
    }

    @Transactional
    public boolean update(UpdateAnimalRequest request) {
        String id = request.getUuid();
        Animal findAnimal = animalRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });;

        findAnimal.setName(request.getName());
        findAnimal.setAge(request.getAge());
        findAnimal.setSpecie(request.getSpecie());
        findAnimal.setBreed(request.getBreed());
        findAnimal.setFindPlace(request.getFindPlace());
        findAnimal.setEnterDate(request.getEnterDate());
        findAnimal.setAdoptionStatus(request.getAdoptionStatus());
        findAnimal.setAdotionStartDate(request.getAdoptionStartDate());
        findAnimal.setEnterAge(request.getEnterAge());
        findAnimal.setNoticeDate(request.getNoticeDate());
        findAnimal.setCharacterType(request.getCharacter());
        findAnimal.setGender(request.getGender());
        if (request.getCenterUuid() != null) {
            Center findCenter = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
                throw new NullPointerException();
            });
            findAnimal.setCenter(findCenter);
        }

        return true;
    }

    public boolean join(CreateAnimalRequest request) {
        String animalUuid = UUID.randomUUID().toString();
        Center center = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        Animal animal = Animal.builder()
                .uuid(animalUuid)
                .name(request.getName())
                .age(request.getAge())
                .specie(request.getSpecie())
                .breed(request.getBreed())
                .findPlace(request.getFindPlace())
                .enterDate(request.getEnterDate())
                .center(center)
                .adoptionStartDate(request.getAdoptionStartDate())
                .noticeDate(request.getNoticeDate())
                .gender(request.getGender())
                .enterAge(request.getEnterAge())
                .adoptionStatus(request.getAdoptionStatus())
                .characterType(request.getCharacter())
                .photoUrl(request.getPhotoUrl())
                .build();

        validateDuplicateAnimal(animal); //중복 회원 검증
        animalRepository.save(animal);
        return true;
    }

    private void validateDuplicateAnimal(Animal animal) {
        List<Animal> findAnimals = animalRepository.findByName(animal.getName());

        if (!findAnimals.isEmpty()) {
            throw new IllegalStateException("이미 존재하는 회원입니다.");
        }
    }


    public List<Animal> findAnimalBySearch(Map<String, String> map) {
        return animalRepository.findAnimalBySearch(map.get("name"), map.get("specie"), map.get("breed"));
    }

    public Page<Animal> findAll(Pageable pageable) {
        return animalRepository.findAll(pageable);
    }

    public Long findPageCount(String uuid, Long size) {

        Long totalCount = animalRepository.findTotalCount(uuid);

        if (totalCount == 0) {
            return 0L;
        }
        return (totalCount-1)/size + 1;
    }
}