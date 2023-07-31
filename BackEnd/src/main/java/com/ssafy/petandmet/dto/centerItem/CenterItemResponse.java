package com.ssafy.petandmet.dto.centerItem;

import com.ssafy.petandmet.domain.CenterItem;
import lombok.Builder;
import lombok.Data;

@Data
public class CenterItemResponse {

    private Long centerItemId;
    private String centerUuid;
    private String itemName;
    private String itemUrl;
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
