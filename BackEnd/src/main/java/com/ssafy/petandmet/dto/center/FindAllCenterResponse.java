package com.ssafy.petandmet.dto.center;

import com.ssafy.petandmet.domain.Center;
import lombok.Data;

@Data
public class FindAllCenterResponse {

    private String uuid;
    private String name;
    private String address;
    private String phone;
    private String email;

    public FindAllCenterResponse(Center center) {
        this.uuid = center.getUuid();
        this.name = center.getName();
        this.address = center.getAddress();
        this.phone = center.getPhone();
        this.email = center.getEmail();
    }
}
