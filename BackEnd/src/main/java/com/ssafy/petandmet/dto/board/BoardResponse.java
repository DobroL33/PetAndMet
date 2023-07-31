package com.ssafy.petandmet.dto.board;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class BoardResponse {

    private String message;
    private String status;

}