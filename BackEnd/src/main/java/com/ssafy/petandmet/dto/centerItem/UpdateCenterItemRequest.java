package com.ssafy.petandmet.dto.centerItem;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
public class UpdateCenterItemRequest {

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
    public UpdateCenterItemRequest(Long centerItemId, String centerUuid, String itemName, String itemUrl, int itemTargetPrice) {
        this.centerItemId = centerItemId;
        this.centerUuid = centerUuid;
        this.itemName = itemName;
        this.itemUrl = itemUrl;
        this.itemTargetPrice = itemTargetPrice;
    }
}
