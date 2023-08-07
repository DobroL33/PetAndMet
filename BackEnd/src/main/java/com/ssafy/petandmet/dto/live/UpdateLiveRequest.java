package com.ssafy.petandmet.dto.live;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class UpdateLiveRequest {
    private Long id;
    private String sessionName;
    private List<Long> centerItemUuid;
    private String animalUuid;
}
