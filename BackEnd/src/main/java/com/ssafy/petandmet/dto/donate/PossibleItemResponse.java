package com.ssafy.petandmet.dto.donate;

import com.ssafy.petandmet.domain.CenterItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class PossibleItemResponse {

    private Long id;
    private String centerUuid;
    private String itemName;
    private String itemUrl;
    private int targetPrice;
    private int currentPrice;

    @Builder
    public PossibleItemResponse(CenterItem donate) {
        this.id = donate.getId();
        this.centerUuid = donate.getCenter().getUuid();
        this.itemName = donate.getItemName();
        this.itemUrl = donate.getItemUrl();
        this.targetPrice = donate.getTargetPrice();
        this.currentPrice = donate.getCurrentPrice();
    }
}

