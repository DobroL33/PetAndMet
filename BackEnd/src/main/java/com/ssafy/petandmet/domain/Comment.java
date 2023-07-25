package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {

    @Id
    @Column(name = "comment_uuid")
    private String uuid;

    @ManyToOne
    @JoinColumn(name = "user_uuid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "board_uuid")
    private Board board;

    private String content;

    private LocalDateTime createdAt;
}
