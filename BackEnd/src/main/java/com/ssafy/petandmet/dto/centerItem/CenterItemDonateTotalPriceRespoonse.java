package com.ssafy.petandmet.dto.centerItem;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CenterItemDonateTotalPriceRespoonse {

    private String message;
    private String status;
    private Long price;
}
