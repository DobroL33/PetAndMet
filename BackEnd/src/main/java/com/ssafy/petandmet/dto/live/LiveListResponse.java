package com.ssafy.petandmet.dto.live;

import com.ssafy.petandmet.domain.Live;
import lombok.Data;

@Data
public class LiveListResponse {

    private Long liveId;
    private String thumbnailImageUrl;


    public LiveListResponse(Live live) {
        this.liveId = live.getId();
        this.thumbnailImageUrl = live.getThumbnail();
    }
}
