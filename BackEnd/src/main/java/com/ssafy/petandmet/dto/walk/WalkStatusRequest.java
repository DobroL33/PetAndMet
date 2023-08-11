package com.ssafy.petandmet.dto.walk;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WalkStatusRequest {
    @JsonProperty("walk_id")
    private int workId;
    @JsonProperty("status_result")
    private String statusResult;
}
