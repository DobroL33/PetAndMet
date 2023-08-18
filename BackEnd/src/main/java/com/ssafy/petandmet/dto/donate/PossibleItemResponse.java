package com.ssafy.petandmet.dto.donate;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.CenterItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
public class PossibleItemResponse {

    private Long id;
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("item_name")
    private String itemName;
    @JsonProperty("item_url")
    private String itemUrl;
    @JsonProperty("target_price")
    private int targetPrice;
    @JsonProperty("current_price")
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

