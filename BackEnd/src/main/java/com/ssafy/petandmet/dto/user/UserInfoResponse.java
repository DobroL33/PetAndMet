package com.ssafy.petandmet.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
public class UserInfoResponse {
    private String message;
    private int status;
    @JsonProperty("user_id")
    private String userId;
    private String name;
    private String email;
    private String phone;
    @JsonProperty("role_type")
    private RoleType roleType;
    private int attendance;
//    private String donateGrade;
//    private WalkGradeType walkGrade;
}
