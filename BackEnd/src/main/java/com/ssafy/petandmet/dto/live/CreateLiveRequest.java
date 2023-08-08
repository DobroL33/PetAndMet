package com.ssafy.petandmet.dto.live;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class CreateLiveRequest {

    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("session_name")
    private String sessionName;
    @JsonProperty("center_item_id")
    private List<Long> centerItemId;
    @JsonProperty("animal_uuid")
    private String animalUuid;

    @Builder
    public CreateLiveRequest(String centerUuid, String sessionName, List<Long>  centerItemId, String animalUuid) {
        this.centerUuid = centerUuid;
        this.sessionName = sessionName;
        this.centerItemId = centerItemId;
        this.animalUuid = animalUuid;
    }
}
