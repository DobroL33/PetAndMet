package com.ssafy.petandmet.dto.animal;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateAnimalRequest {
    private String name;
    private int age;
    private String specie;
    private String breed;
    @JsonProperty("find_place")
    private String findPlace;
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("enter_date")
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