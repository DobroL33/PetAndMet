package com.ssafy.petandmet.dto.board;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateBoardResponse {

    private String status;
    private String message;
}