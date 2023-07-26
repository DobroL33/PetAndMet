package com.ssafy.petandmet.dto.animal;

import com.ssafy.petandmet.domain.Animal;
import lombok.Builder;
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

    public FindAnimalBySearchResponse(Animal animal) {
        this.name = animal.getName();
        this.age = animal.getAge();
        this.specie = animal.getSpecie();
        this.breed = animal.getBreed();
        this.findPlace = animal.getFindPlace();
        this.centerUuid = animal.getCenter().getUuid();
        this.enteredDate = animal.getEnterDate();
    }
}
