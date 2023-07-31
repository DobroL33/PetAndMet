package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_uuid")
    private User user;
    @ManyToOne
    @JoinColumn(name = "board_id")
    private Board board;
    private String content;
    private LocalDateTime createdAt;

    @Builder
    public Comment(Long id, User user, Board board, String content, LocalDateTime createdAt){
        this.id = id;
        this.board = board;
        this.content = content;
        this.createdAt = createdAt;
        this.user = user;
    }

    public Comment() {

    }
}
