package com.ssafy.petandmet.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.User;
import lombok.Data;

@Data
public class UserDetailResponse {

    private String name;
    private String email;
    @JsonProperty("phone_number")
    private String phoneNumber;
    public UserDetailResponse(User user) {
        this.name = user.getName();
        this.email = user.getEmail();
        this.phoneNumber = user.getPhone();
    }
}
