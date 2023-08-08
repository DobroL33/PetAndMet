package com.ssafy.petandmet.dto.animal;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("find_place")
    private String findPlace;
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("enter_date")
    private LocalDateTime enterDate;
    @JsonProperty("adoption_status")
    private AdoptionStatus adoptionStatus;
    private Gender gender;
    @JsonProperty("enter_age")
    private int enterAge;
    @JsonProperty("notice_date")
    private String noticeDate;
    @JsonProperty("adoption_start_date")
    private LocalDateTime adoptionStartDate;
    private CharacterType character;
    @JsonProperty("photo_url")
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