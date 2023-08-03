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

    public FindAnimalByIdResponse findOne(String id) {

        Animal findAnimal = animalRepository.findById(id).orElseThrow(() -> {
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
                .enteredDate(findAnimal.getEnterDate())
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
        findAnimal.setEnterDate(request.getEnteredDate());
        if (request.getCenterUuid() != null) {
            Center findCenter = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
                throw new NullPointerException();
            });
            findAnimal.setCenter(findCenter);
        }

        return true;
    }

    public boolean join(CreateAnimalRequest request) {
        Center center = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        Animal animal = Animal.builder()
                .uuid("123")
                .name(request.getName())
                .age(request.getAge())
                .specie(request.getSpecie())
                .breed(request.getBreed())
                .findPlace(request.getFindPlace())
                .enterDate(request.getEnteredDate())
                .center(center)
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
}