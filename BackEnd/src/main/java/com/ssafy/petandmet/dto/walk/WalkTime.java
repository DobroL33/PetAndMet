package com.ssafy.petandmet.dto.walk;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.StatusType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class WalkTime {
    @JsonProperty("walk_id")
    private long walkId;
    private LocalDate date;
    private int time;
    @JsonProperty("animal_uuid")
    private String animalUuid;
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("user_uuid")
    private String userUuid;
    private StatusType status;

    public WalkTime(long walkId, LocalDate date, int time, String animalUuid, String centerUuid, String userUuid, StatusType status) {
        this.walkId = walkId;
        this.date = date;
        this.time = time;
        this.animalUuid = animalUuid;
        this.centerUuid = centerUuid;
        this.userUuid = userUuid;
        this.status = status;
    }
}
