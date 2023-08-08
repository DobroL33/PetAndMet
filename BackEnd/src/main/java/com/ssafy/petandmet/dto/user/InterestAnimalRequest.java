package com.ssafy.petandmet.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class InterestAnimalRequest {
    @JsonProperty("user_uuid")
    private String userUuid;
    @JsonProperty("animal_uuid")
    private String animalUuid;
}
