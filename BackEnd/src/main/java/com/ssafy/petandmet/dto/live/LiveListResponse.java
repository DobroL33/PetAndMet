package com.ssafy.petandmet.dto.live;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.Live;
import lombok.Data;

@Data
public class LiveListResponse {

    @JsonProperty("live_id")
    private Long liveId;
    @JsonProperty("session_id")
    private String sessionId;
    @JsonProperty("session_name")
    private String sessionName;
    @JsonProperty("animal_uuid")
    private String animalUuid;
    @JsonProperty("thumbnail_image_url")
    private String thumbnailImageUrl;


    public LiveListResponse(Live live) {
        this.liveId = live.getId();
        this.thumbnailImageUrl = live.getThumbnail();
        this.sessionId = live.getSessionId();
        this.sessionName = live.getSessionName();
        if (live.getAnimal() != null) {
            this.animalUuid = live.getAnimal().getUuid();
        }
    }
}
