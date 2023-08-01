package com.ssafy.petandmet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
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

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_uuid")
    private User user;

    @JsonIgnore
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
