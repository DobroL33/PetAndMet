package com.ssafy.petandmet.dto.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class PasswordResetRequest {
    private String id;
    private String email;
    private String password;

    public void passwordEncoder(BCryptPasswordEncoder encoder, String tmp) {
        this.password = encoder.encode(tmp);
    }
}