package com.ssafy.petandmet.dto.animal;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FindAnimalBySearchResponse {
    private String name;
    private int age;
    private String specie;
    private String breed;
    private String findPlace;
    private String centerUuid;
    private LocalDateTime enteredDate;

    private AdoptionStatus adoptionStatus;
    private LocalDateTime adoptionStartDate;
    private Gender gender;
    private int enterAge;
    private String noticeDate;

    private CharacterType character;

    public FindAnimalBySearchResponse(String name, int age, String specie, String breed, String findPlace, String centerUuid, LocalDateTime enteredDate, AdoptionStatus adoptionStatus, LocalDateTime adoptionStartDate, Gender gender, int enterAge, String noticeDate, CharacterType character) {
        this.name = name;
        this.age = age;
        this.specie = specie;
        this.breed = breed;
        this.findPlace = findPlace;
        this.centerUuid = centerUuid;
        this.enteredDate = enteredDate;
        this.adoptionStatus = adoptionStatus;
        this.adoptionStartDate = adoptionStartDate;
        this.gender = gender;
        this.enterAge = enterAge;
        this.noticeDate = noticeDate;
        this.character = character;
    }
}
