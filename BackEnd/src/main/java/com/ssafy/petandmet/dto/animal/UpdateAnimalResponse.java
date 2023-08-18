package com.ssafy.petandmet.dto.animal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateAnimalResponse {

    private int status;
    private String message;
}