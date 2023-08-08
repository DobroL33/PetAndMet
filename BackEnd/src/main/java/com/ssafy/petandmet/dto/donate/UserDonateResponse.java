package com.ssafy.petandmet.dto.donate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.Donate;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDonateResponse {

//    private String message;
//    private String status;
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

    public UserDonateResponse(Donate donate) {
//        this.message = "후원 내역 조회 성공";
//        this.status = status;
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
