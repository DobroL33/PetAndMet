package com.ssafy.petandmet.dto.center;

import lombok.Builder;
import lombok.Data;

@Data
public class UpdateCenterRequest {
    private String uuid;
    private String name;
    private String address;
    private String phone;
    private String email;

    @Builder
    public UpdateCenterRequest(String uuid, String name, String address, String phone, String email){
        this.uuid = uuid;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }

    @Override
    public String toString() {
        return "UpdateCenterRequest{" +
                "uuid='" + uuid + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", phone='" + phone + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}
