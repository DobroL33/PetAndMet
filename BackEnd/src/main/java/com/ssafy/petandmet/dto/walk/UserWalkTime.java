package com.ssafy.petandmet.dto.walk;

import com.ssafy.petandmet.domain.StatusType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserWalkTime {
    private LocalDate date;
    private int time;
    private StatusType status;

    public UserWalkTime(LocalDate date, int time, StatusType status) {
        this.date = date;
        this.time = time;
        this.status = status;
    }
}
