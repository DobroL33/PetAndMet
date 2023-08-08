package com.ssafy.petandmet.dto.animal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FindAnimalByIdResponse {

    private String message;
    private String status;
    private String name;
    private int age;
    private String specie;
    private String breed;
    private String findPlace;
    private String centerUuid;
    private LocalDateTime enterDate;
    private AdoptionStatus adoptionStatus;

    private Gender gender;

    private String noticeDate;

    private LocalDateTime adotionStartDate;

    private CharacterType character;

    private int enterAge;

    private String photoUrl;

    @Builder
    public FindAnimalByIdResponse(String photoUrl, int enterAge, CharacterType character, String message, String status, String name, int age, String specie, String breed, String findPlace, String centerUuid, LocalDateTime enterDate, AdoptionStatus adoptionStatus, Gender gender, String noticeDate, LocalDateTime adotionStartDate) {
        this.photoUrl = photoUrl;
        this.enterAge = enterAge;
        this.character = character;
        this.message = message;
        this.status = status;
        this.name = name;
        this.age = age;
        this.specie = specie;
        this.breed = breed;
        this.findPlace = findPlace;
        this.centerUuid = centerUuid;
        this.enterDate = enterDate;
        this.adoptionStatus = adoptionStatus;
        this.gender = gender;
        this.noticeDate = noticeDate;
        this.adotionStartDate = adotionStartDate;
    }
}
