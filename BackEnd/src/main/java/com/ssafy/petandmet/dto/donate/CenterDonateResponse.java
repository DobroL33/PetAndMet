package com.ssafy.petandmet.dto.donate;

import com.ssafy.petandmet.domain.Donate;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CenterDonateResponse {

    private String userUuid;
    private String animalUuid;
    private String centerUuid;
    private Long centerItemId;
    private int donatePrice;
    private LocalDateTime donateDate;

    @Builder
    public CenterDonateResponse(Donate donate) {
        this.userUuid = donate.getUser().getUuid();
        this.animalUuid = donate.getAnimal().getUuid();
        this.centerUuid = donate.getCenter().getUuid();
        this.centerItemId = donate.getCenterItem().getId();
        this.donatePrice = donate.getPrice();
        this.donateDate = donate.getDonateDate();
    }
}
