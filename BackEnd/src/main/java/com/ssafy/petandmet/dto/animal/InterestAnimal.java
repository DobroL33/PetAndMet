package com.ssafy.petandmet.dto.animal;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InterestAnimal {
    private String uuid;
    private String name;
    private int age;
    private String specie;
    private String breed;
    private String findPlace;
    private LocalDateTime enterDate;
    private String photoUrl;
    private String centerUuid;

    public InterestAnimal(String uuid, String name, int age, String specie, String breed, String photoUrl, String centerUuid, LocalDateTime enterDate) {
        this.uuid = uuid;
        this.name = name;
        this.age = age;
        this.specie = specie;
        this.breed = breed;
        this.photoUrl = photoUrl;
        this.centerUuid = centerUuid;
        this.enterDate = enterDate;
    }
}