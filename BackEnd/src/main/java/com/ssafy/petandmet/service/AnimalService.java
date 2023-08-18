package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.dto.animal.*;
import com.ssafy.petandmet.dto.user.UserProfileUploadRequest;
import com.ssafy.petandmet.repository.AnimalRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import com.ssafy.petandmet.util.SecurityUtil;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnimalService {

    private final AnimalRepository animalRepository;

    private final CenterRepository centerRepository;

    private final S3Service s3Service;


    @Transactional
    public void delete(String id) {
        Animal findAnimal = animalRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });
        animalRepository.delete(findAnimal);
    }

    public FindAnimalByIdResponse findOne(String uuid) {

        Animal findAnimal = animalRepository.findById(uuid).orElseThrow(() -> {
            throw new NullPointerException();
        });

        if (findAnimal.getPhotoUrl() != null && !findAnimal.getPhotoUrl().equals("")) {
            String profileUrl = s3Service.getProfileUrl(findAnimal.getPhotoUrl());
            findAnimal.setPhotoUrl(profileUrl);
        }

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
                .adoptionStartDate(findAnimal.getAdoptionStartDate())
                .noticeDate(findAnimal.getNoticeDate())
                .character(findAnimal.getCharacterType())
                .photoUrl(findAnimal.getPhotoUrl())
                .build();

        if (findAnimal.getCenter() != null) {
            Center center = centerRepository.findById(findAnimal.getCenter().getUuid()).orElseThrow(() -> {
                throw new NullPointerException();
            });
            response.setCenterUuid(center.getUuid());
        }

        return response;
    }

    @Transactional
    public void update(UpdateAnimalRequest request) {
        String id = request.getUuid();
        Animal findAnimal = animalRepository.findById(id).orElseThrow(() -> {
            throw new NullPointerException();
        });

        findAnimal.setName(request.getName());
        findAnimal.setAge(request.getAge());
        findAnimal.setSpecie(request.getSpecie());
        findAnimal.setBreed(request.getBreed());
        findAnimal.setFindPlace(request.getFindPlace());
        findAnimal.setEnterDate(request.getEnterDate());
        findAnimal.setAdoptionStatus(request.getAdoptionStatus());
        findAnimal.setAdoptionStartDate(request.getAdoptionStartDate());
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
    }

    public void join(MultipartFile image, CreateAnimalRequest request) throws FileUploadException {
        String animalUuid = UUID.randomUUID().toString();
        Center center = centerRepository.findById(request.getCenterUuid()).orElseThrow(() -> {
            throw new NullPointerException();
        });

        String fileName = "";
        if (image != null) {
            String currentTime = LocalDateTime.now().toString();
            fileName = currentTime + image.getOriginalFilename();
            s3Service.uploadFile(image, fileName);
        }

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
                .photoUrl(fileName)
                .build();
        log.debug(animal.toString());
        animalRepository.save(animal);
    }

    public Page<Animal> findAnimalBySearch(Map<String, String> map, Pageable pageable) {
        if (map.get("adoptionStatus") == null) {
            return animalRepository.findAnimalBySearch(map.get("name"), map.get("specie"), map.get("breed"), map.get("centerUuid"), null,pageable);
        }
        if (map.get("adoptionStatus").equals("POSSIBLE")) {
            return animalRepository.findAnimalBySearch(map.get("name"), map.get("specie"), map.get("breed"), map.get("centerUuid"), AdoptionStatus.POSSIBLE,pageable);
        }
        return animalRepository.findAnimalBySearch(map.get("name"), map.get("specie"), map.get("breed"), map.get("centerUuid"), AdoptionStatus.IMPOSSIBLE,pageable);
    }

    public Page<Animal> findAll(Pageable pageable) {
        return animalRepository.findAll(pageable);
    }

    public Long findPageCount(String uuid, Long size) {

        Long totalCount = animalRepository.findTotalCount(uuid);

        if (totalCount == 0) {
            return 0L;
        }
        return (totalCount - 1) / size + 1;
    }
}
