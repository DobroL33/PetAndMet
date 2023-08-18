package com.ssafy.petandmet.dto.animal;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AnimalResponse {

    private int status;
    private String message;
}