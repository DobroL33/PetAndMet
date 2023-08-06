package com.ssafy.petandmet.dto.animal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateAnimalRequest {
    private String name;
    private int age;
    private String specie;
    private String breed;
    private String findPlace;
    private String centerUuid;

    private LocalDateTime enterDate;
    private AdoptionStatus adoptionStatus;
    private Gender gender;
    private int enterAge;
    private String noticeDate;
    private LocalDateTime adoptionStartDate;

    private CharacterType character;

    private String photoUrl;

    @Builder
    public CreateAnimalRequest(String photoUrl, CharacterType character, String name, int age, String specie, String breed, String findPlace, String centerUuid, LocalDateTime enterDate, AdoptionStatus adoptionStatus, Gender gender, int enterAge, String noticeDate, LocalDateTime adoptionStartDate) {
        this.photoUrl = photoUrl;
        this.character = character;
        this.name = name;
        this.age = age;
        this.specie = specie;
        this.breed = breed;
        this.findPlace = findPlace;
        this.centerUuid = centerUuid;
        this.enterDate = enterDate;
        this.adoptionStatus = adoptionStatus;
        this.gender = gender;
        this.enterAge = enterAge;
        this.noticeDate = noticeDate;
        this.adoptionStartDate = adoptionStartDate;
    }
}