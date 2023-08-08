package com.ssafy.petandmet.dto.animal;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateAnimalRequest {


    private String uuid;
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
    public UpdateAnimalRequest(String uuid, String name, int age, String specie, String breed, String findPlace, String centerUuid, LocalDateTime enterDate, AdoptionStatus adoptionStatus, Gender gender, int enterAge, String noticeDate, LocalDateTime adoptionStartDate, CharacterType character, String photoUrl) {
        this.uuid = uuid;
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
        this.character = character;
        this.photoUrl = photoUrl;
    }
}