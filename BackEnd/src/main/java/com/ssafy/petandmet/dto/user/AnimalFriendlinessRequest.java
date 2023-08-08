package com.ssafy.petandmet.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class AnimalFriendlinessRequest {

    @JsonProperty("user_uuid")
    private String userUuid;
    @JsonProperty("animal_uuid")
    private String animalUuid;
}
