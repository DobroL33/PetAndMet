package com.ssafy.petandmet.dto.live;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class UpdateLiveRequest {
    private Long id;
    @JsonProperty("session_name")
    private String sessionName;
    @JsonProperty("center_item_id")
    private List<Long> centerItemId;
    @JsonProperty("animal_uuid")
    private String animalUuid;
    @JsonProperty("session_id")
    private String sessionId;
}
