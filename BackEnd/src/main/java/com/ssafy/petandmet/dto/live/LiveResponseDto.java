package com.ssafy.petandmet.dto.live;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.Live;
import lombok.Data;

@Data
public class LiveResponseDto {

    @JsonProperty("live_id")
    private Long liveId;
    private String thumbnail;


    public LiveResponseDto(Live live) {
        this.liveId = live.getId();
        this.thumbnail = live.getThumbnail();
    }
}
