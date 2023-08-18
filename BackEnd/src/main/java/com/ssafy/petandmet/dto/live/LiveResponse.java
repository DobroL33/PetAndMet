package com.ssafy.petandmet.dto.live;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class LiveResponse<T>{

    private String message;
    private int status;
    @JsonProperty("total_count")
    private int totalCount;
    private List<T> lives;
}
