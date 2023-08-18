package com.ssafy.petandmet.dto.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
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

    public void passwordEncoder(BCryptPasswordEncoder encoder) {
        this.password = encoder.encode(this.password);
    }
}