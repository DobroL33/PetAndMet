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
    public PossibleItemResponse(CenterItem centerItem) {
        this.id = centerItem.getId();
        this.centerUuid = centerItem.getCenter().getUuid();
        this.itemName = centerItem.getItemName();
        this.itemUrl = centerItem.getItemUrl();
        this.targetPrice = centerItem.getTargetPrice();
        this.currentPrice = centerItem.getCurrentPrice();
    }
}

