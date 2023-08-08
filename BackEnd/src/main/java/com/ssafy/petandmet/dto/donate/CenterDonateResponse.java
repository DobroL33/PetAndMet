package com.ssafy.petandmet.dto.donate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.Donate;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CenterDonateResponse {

    @JsonProperty("user_uuid")
    private String userUuid;
    @JsonProperty("animal_uuid")
    private String animalUuid;
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("center_item_id")
    private Long centerItemId;
    @JsonProperty("donate_price")
    private int donatePrice;
    @JsonProperty("donate_date")
    private LocalDateTime donateDate;

    @Builder
    public CenterDonateResponse(Donate donate) {
        this.userUuid = donate.getUser().getUuid();
        if (donate.getAnimal() != null) {
            this.animalUuid = donate.getAnimal().getUuid();
        }
        this.centerUuid = donate.getCenter().getUuid();
        if (donate.getCenterItem() != null) {
            this.centerItemId = donate.getCenterItem().getId();
        }
        this.donatePrice = donate.getPrice();
        this.donateDate = donate.getDonateDate();
    }
}
