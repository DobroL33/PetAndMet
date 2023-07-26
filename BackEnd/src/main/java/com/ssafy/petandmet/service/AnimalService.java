package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.dto.animal.UpdateAnimalRequest;
import com.ssafy.petandmet.repository.AnimalRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnimalService {

    private final AnimalRepository animalRepository;

//    private final CenterRepository centerRepository;


    @Transactional
    public Optional<String> delete(String id) {
        Optional<Animal> findAnimal = animalRepository.findById(id);
        if(findAnimal.isEmpty()) {
            return Optional.empty();
        }
        animalRepository.delete(findAnimal.get());
        return Optional.of(id);
    }

    public Optional<Animal> findOne(String id) {
        return animalRepository.findById(id);
    }

    @Transactional
    public void update(UpdateAnimalRequest request) {
        String id = request.getUuid();
        Optional<Animal> findAnimal = animalRepository.findById(id);

        if(findAnimal.isEmpty()) {
            return;
        }

        findAnimal.get().setName(request.getName());
        findAnimal.get().setAge(request.getAge());
        findAnimal.get().setSpecie(request.getSpecie());
        findAnimal.get().setBreed(request.getBreed());
        findAnimal.get().setFindPlace(request.getFindPlace());
        findAnimal.get().setEnterDate(request.getEnteredDate());
//        Center findCenter = centerRepository.findOne(request.getCenterUuid());
//        findAnimal.setCenter(findCenter);
    }

    public String join(Animal animal) {
        validateDuplicateAnimal(animal); //중복 회원 검증
        animalRepository.save(animal);
        return animal.getUuid();
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