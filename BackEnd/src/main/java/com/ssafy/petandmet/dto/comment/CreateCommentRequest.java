package com.ssafy.petandmet.dto.comment;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateCommentRequest {
    private String id;
    @JsonProperty("user_uuid")
    private String userUuid;
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("board_id")
    private Long boardId;
    private String content;
    private LocalDateTime createdAt;

    @Builder
    public CreateCommentRequest(String id, String userUuid, String centerUuid, Long boardId, String content, LocalDateTime createdAt){
        this.id = id;
        this.userUuid = userUuid;
        this.centerUuid = centerUuid;
        this.boardId = boardId;
        this.content = content;
        this.createdAt = createdAt;
    }
}
