package com.ssafy.petandmet.dto.board;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ssafy.petandmet.domain.Board;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FindAllBoardResponse {

    private Long id;
    @JsonProperty("user_uuid")
    private String userUuid;
    @JsonProperty("center_uuid")
    private String centerUuid;
    private String title;
    private String content;
    @JsonProperty("board_photo_url")
    private String photoUrl;
    private String type;
    @JsonProperty("created_at")
    private LocalDateTime createdAt;
    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
    @JsonProperty("center_name")
    private String centerName;
    @JsonProperty("user_name")
    private String userName;

    public FindAllBoardResponse(Long id, String userUuid, String centerUuid, String title, String content, String type, LocalDateTime createdAt, LocalDateTime updatedAt, String centerName, String userName) {
        this.id = id;
        this.userUuid = userUuid;
        this.centerUuid = centerUuid;
        this.title = title;
        this.content = content;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.centerName = centerName;
        this.userName = userName;
    }
}
