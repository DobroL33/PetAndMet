package com.ssafy.petandmet.dto.board;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateBoardRequest {
    private String id;
    @JsonProperty("user_uuid")
    private String userUuid;
    @JsonProperty("center_uuid")
    private String centerUuid;
    private String title;
    private String content;
    @JsonProperty("board_photo_url")
    private String photoUrl;
    private String type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Builder
    public CreateBoardRequest(String id, String userUuid, String centerUuid, String title, String content, String photoUrl, String type, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.userUuid = userUuid;
        this.centerUuid = centerUuid;
        this.title = title;
        this.content = content;
        this.photoUrl = photoUrl;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}