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

    public CenterItemResponse(Long centerItemId, String centerUuid, String itemName, String itemUrl, int itemTargetPrice) {
        this.centerItemId = centerItemId;
        this.centerUuid = centerUuid;
        this.itemName = itemName;
        this.itemUrl = itemUrl;
        this.itemTargetPrice = itemTargetPrice;
    }
}
