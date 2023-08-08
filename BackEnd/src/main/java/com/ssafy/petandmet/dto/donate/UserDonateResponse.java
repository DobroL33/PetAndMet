package com.ssafy.petandmet.dto.donate;

import com.ssafy.petandmet.domain.Donate;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UserDonateResponse {

//    private String message;
//    private String status;
    private String userUuid;
    private String animalUuid;
    private String centerUuid;
    private Long centerItemId;
    private int donatePrice;
    private LocalDateTime donateDate;

    public UserDonateResponse(Donate donate) {
//        this.message = "후원 내역 조회 성공";
//        this.status = status;
        this.userUuid = donate.getUser().getUuid();
        this.animalUuid = donate.getAnimal().getUuid();
        this.centerUuid = donate.getCenter().getUuid();
        this.centerItemId = donate.getCenterItem().getId();
        this.donatePrice = donate.getPrice();
        this.donateDate = donate.getDonateDate();
    }
}
