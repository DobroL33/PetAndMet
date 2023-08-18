package com.ssafy.petandmet.dto.centerItem;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
public class CreateCenterItemRequest {

    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("item_name")
    private String itemName;
    @JsonProperty("item_url")
    private String itemUrl;
    @JsonProperty("item_target_price")
    private int itemTargetPrice;

    @Builder
    public CreateCenterItemRequest(String centerUuid, String itemName, String itemUrl, int itemTargetPrice) {
        this.centerUuid = centerUuid;
        this.itemName = itemName;
        this.itemUrl = itemUrl;
        this.itemTargetPrice = itemTargetPrice;
    }
}
