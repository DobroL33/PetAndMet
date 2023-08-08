package com.ssafy.petandmet.dto.live;

import com.ssafy.petandmet.domain.Live;
import lombok.Data;

@Data
public class LiveResponseDto {

    private Long liveId;
    private String thumbnail;


    public LiveResponseDto(Live live) {
        this.liveId = live.getId();
        this.thumbnail = live.getThumbnail();
    }
}
