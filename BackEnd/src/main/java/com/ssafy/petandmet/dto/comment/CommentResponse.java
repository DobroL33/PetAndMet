package com.ssafy.petandmet.dto.comment;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommentResponse {

    private String message;
    private String status;

}