package com.ssafy.petandmet.dto.walk;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class SignWalkRequest {
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("animal_uuid")
    private String animalUuid;
    private LocalDate date;
    private int time;
}
