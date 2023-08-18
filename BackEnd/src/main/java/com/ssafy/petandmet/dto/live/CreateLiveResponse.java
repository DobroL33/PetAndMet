package com.ssafy.petandmet.dto.live;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateLiveResponse {

    private String message;
    private String status;
    @JsonProperty("live_id")
    private Long liveId;
}
