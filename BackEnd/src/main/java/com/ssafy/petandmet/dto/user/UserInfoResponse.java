package com.ssafy.petandmet.dto.user;

import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.DonateGradeType;
import com.ssafy.petandmet.domain.Interest;
import com.ssafy.petandmet.domain.WalkGradeType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserInfoResponse {
    private String message;
    private String status;
    private String name;
    private String email;
    private String phone;
    private int attendance;
//    private String donateGrade;
//    private WalkGradeType walkGrade;
}
