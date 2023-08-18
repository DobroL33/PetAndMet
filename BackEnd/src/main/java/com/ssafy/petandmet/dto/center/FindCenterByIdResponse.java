package com.ssafy.petandmet.dto.center;

import lombok.Builder;
import lombok.Data;

@Data
public class FindCenterByIdResponse {

    private String message;
    private String status;
    private String uuid;
    private String name;
    private String address;
    private String phone;
    private String email;

    @Builder
    public FindCenterByIdResponse(String message, String status, String uuid, String name, String address, String phone, String email){
        this.message = message;
        this.status = status;
        this.uuid = uuid;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}
