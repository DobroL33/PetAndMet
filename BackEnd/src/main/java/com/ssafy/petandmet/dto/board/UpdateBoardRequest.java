package com.ssafy.petandmet.dto.board;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class UpdateBoardRequest {

    private Long id;
    private String user;
    private String center;
    private String title;
    private String content;
    private String photoUrl;
    private String type;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Builder
    public UpdateBoardRequest(Long id, String user, String center, String title, String content, String photoUrl, String type, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.user = user;
        this.center = center;
        this.title = title;
        this.content = content;
        this.photoUrl = photoUrl;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}