package com.ssafy.petandmet.dto.live;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.Live;
import lombok.Data;

@Data
public class LiveResponseDto {

    @JsonProperty("live_id")
    private Long liveId;
    private String thumbnail;
    @JsonProperty("session_id")
    private String sessionId;
    @JsonProperty("session_name")
    private String sessionName;
    @JsonProperty("animal_uuid")
    private String animalUuid;
    @JsonProperty("center_uuid")
    private String centerUuid;

    public LiveResponseDto(Live live) {
        this.liveId = live.getId();
        this.thumbnail = live.getThumbnail();
        if (live.getAnimal() != null) {
            this.animalUuid = live.getAnimal().getUuid();
        }
        if (live.getCenter() != null) {
            this.centerUuid = live.getCenter().getUuid();
        }
        this.sessionId = live.getSessionId();
        this.sessionName = live.getSessionName();
    }
}
