package com.ssafy.petandmet.dto.live;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.Live;
import lombok.Data;

@Data
public class LiveListResponse {

    @JsonProperty("live_id")
    private Long liveId;
    @JsonProperty("thumbnail_image_url")
    private String thumbnailImageUrl;


    public LiveListResponse(Live live) {
        this.liveId = live.getId();
        this.thumbnailImageUrl = live.getThumbnail();
    }
}
