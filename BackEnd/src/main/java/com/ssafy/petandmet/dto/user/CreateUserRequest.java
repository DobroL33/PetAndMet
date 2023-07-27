package com.ssafy.petandmet.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class CreateUserRequest {
    private String id;
    private String password;
    private String email;
    private String phone;
    private String name;
    @JsonProperty("role_type")
    private String roleType;
    @JsonProperty("center_name")
    private String centerName;
    @JsonProperty("center_address")
    private String centerAddress;
    @JsonProperty("center_phone")
    private String centerPhone;
    @JsonProperty("center_email")
    private String centerEmail;

    public CreateUserRequest(String id, String password, String email, String phone, String name, String roleType, String centerName, String centerAddress, String centerPhone, String centerEmail) {
        this.id = id;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.name = name;
        this.roleType = roleType;
        this.centerName = centerName;
        this.centerAddress = centerAddress;
        this.centerPhone = centerPhone;
        this.centerEmail = centerEmail;
    }
}