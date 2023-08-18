package com.ssafy.petandmet.dto.donate;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CreateAnimalDonateRequest {
    @JsonProperty("user_uuid")
    private String userUuid;
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("animal_uuid")
    private String animalUuid;
    @JsonProperty("donate_price")
    private int donatePrice;
}
