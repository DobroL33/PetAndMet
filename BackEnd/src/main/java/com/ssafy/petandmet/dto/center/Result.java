package com.ssafy.petandmet.dto.center;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result <T> {

    private boolean success;
    private T response;
    private String error;

}
