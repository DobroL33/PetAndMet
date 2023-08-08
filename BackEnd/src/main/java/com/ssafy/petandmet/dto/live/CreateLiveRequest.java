package com.ssafy.petandmet.dto.live;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class CreateLiveRequest {

    private String centerUuid;
    private String sessionName;
    private List<Long> centerItemUuid;
    private String animalUuid;

    @Builder
    public CreateLiveRequest(String centerUuid, String sessionName, List<Long>  centerItemUuid, String animalUuid) {
        this.centerUuid = centerUuid;
        this.sessionName = sessionName;
        this.centerItemUuid = centerItemUuid;
        this.animalUuid = animalUuid;
    }
}
