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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public FindAllBoardResponse(Board board) {
        this.id = board.getId();
        this.userUuid = board.getUser().getUuid();
        this.centerUuid = board.getCenter().getUuid();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.photoUrl = board.getPhotoUrl();
        this.type = board.getType();
        this.createdAt = board.getCreatedAt();
        this.updatedAt = board.getUpdatedAt();
    }
}
