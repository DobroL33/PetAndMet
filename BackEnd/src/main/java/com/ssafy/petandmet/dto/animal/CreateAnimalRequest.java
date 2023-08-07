package com.ssafy.petandmet.dto.animal;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    private MultipartFile photo;
}