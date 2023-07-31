package com.ssafy.petandmet.dto.board;

import com.ssafy.petandmet.domain.User;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class FindBoardByIdResponse {

    private String message;
    private String status;
    private String id;
    private String userUuid;
    private String centerUuid;
    private String title;
    private String content;
    private String photoUrl;
    private String type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;


    @Builder
    public FindBoardByIdResponse(String message, String status, String id, String userUuid, String centerUuid, String title, String content, String photoUrl, String type, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.message = message;
        this.status = status;
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
