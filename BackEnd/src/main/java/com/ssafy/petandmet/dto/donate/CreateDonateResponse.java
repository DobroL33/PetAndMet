package com.ssafy.petandmet.dto.donate;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateDonateResponse {

    private int status;
    private String message;
}
