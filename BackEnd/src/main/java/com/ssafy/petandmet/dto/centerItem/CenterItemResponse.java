package com.ssafy.petandmet.dto.centerItem;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.CenterItem;
import lombok.Builder;
import lombok.Data;

@Data
public class CenterItemResponse {

    @JsonProperty("center_item_id")
    private Long centerItemId;
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("item_name")
    private String itemName;
    @JsonProperty("item_url")
    private String itemUrl;
    @JsonProperty("item_target_price")
    private int itemTargetPrice;

    @Builder
    public CenterItemResponse(CenterItem centerItem) {
        this.centerItemId = centerItem.getId();
        this.centerUuid = centerItem.getCenter().getUuid();
        this.itemName = centerItem.getItemName();
        this.itemUrl = centerItem.getItemUrl();
        this.itemTargetPrice = centerItem.getTargetPrice();
    }
}
