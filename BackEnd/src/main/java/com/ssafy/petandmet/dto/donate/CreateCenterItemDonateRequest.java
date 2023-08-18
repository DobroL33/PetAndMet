package com.ssafy.petandmet.dto.donate;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class CreateCenterItemDonateRequest {

    @JsonProperty("user_uuid")
    private String userUuid;
    @JsonProperty("animal_uuid")
    private String animalUuid;
    @JsonProperty("center_item_id")
    private Long itemId;
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("donate_price")
    private int donatePrice;
}
