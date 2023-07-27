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
    private LocalDateTime enteredDate;

    @Builder
    public UpdateAnimalRequest(String uuid, String name, int age, String specie, String breed, String findPlace, String centerUuid, LocalDateTime enteredDate) {
        this.uuid = uuid;
        this.name = name;
        this.age = age;
        this.specie = specie;
        this.breed = breed;
        this.findPlace = findPlace;
        this.centerUuid = centerUuid;
        this.enteredDate = enteredDate;
    }
}