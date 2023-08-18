package com.ssafy.petandmet.dto.animal;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InterestAnimal {
    private String uuid;
    private String name;
    private int age;
    private String specie;
    private String breed;
    @JsonProperty("find_place")
    private String findPlace;
    @JsonProperty("enter_date")
    private LocalDateTime enterDate;
    @JsonProperty("photo_url")
    private String photoUrl;
    @JsonProperty("center_uuid")
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