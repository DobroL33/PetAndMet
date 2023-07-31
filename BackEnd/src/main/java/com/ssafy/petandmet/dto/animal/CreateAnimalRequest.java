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
    private LocalDateTime enteredDate;

    @Builder
    public CreateAnimalRequest(String name, int age, String specie, String breed, String findPlace, String centerUuid, LocalDateTime enteredDate) {
        this.name = name;
        this.age = age;
        this.specie = specie;
        this.breed = breed;
        this.findPlace = findPlace;
        this.centerUuid = centerUuid;
        this.enteredDate = enteredDate;
    }

}