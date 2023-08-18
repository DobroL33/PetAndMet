package com.ssafy.petandmet.dto.animal;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FindAnimalByIdResponse {

    private String message;
    private String status;
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
    @JsonProperty("notice_date")
    private String noticeDate;
    @JsonProperty("adoption_start_date")
    private LocalDateTime adoptionStartDate;
    private CharacterType character;
    @JsonProperty("enter_age")
    private int enterAge;
    @JsonProperty("photo_url")
    private String photoUrl;

    @Builder
    public FindAnimalByIdResponse(String photoUrl, int enterAge, CharacterType character, String message, String status, String name, int age, String specie, String breed, String findPlace, String centerUuid, LocalDateTime enterDate, AdoptionStatus adoptionStatus, Gender gender, String noticeDate, LocalDateTime adoptionStartDate) {
        this.photoUrl = photoUrl;
        this.enterAge = enterAge;
        this.character = character;
        this.message = message;
        this.status = status;
        this.name = name;
        this.age = age;
        this.specie = specie;
        this.breed = breed;
        this.findPlace = findPlace;
        this.centerUuid = centerUuid;
        this.enterDate = enterDate;
        this.adoptionStatus = adoptionStatus;
        this.gender = gender;
        this.noticeDate = noticeDate;
        this.adoptionStartDate = adoptionStartDate;
    }
}
