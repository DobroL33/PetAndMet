package com.ssafy.petandmet.dto.center;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Result <T> {

    private String success;
    private T response;
    private String error;

}
