package com.ssafy.petandmet.dto.animal;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@JsonNaming(value = PropertyNamingStrategies.SnakeCaseStrategy.class)
public class CreateAnimalRequest implements Serializable {
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
}