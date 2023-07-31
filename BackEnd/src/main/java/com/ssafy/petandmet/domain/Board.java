package com.ssafy.petandmet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.ErrorResponse;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boards")
@Getter
@Setter
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_uuid")
    @JsonIgnore
    private User user;

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    @JsonIgnore
    private Center center;

    @OneToMany(mappedBy = "board")
    @JsonIgnore
    private List<Comment> commentList = new ArrayList<>();

    private String title;

    private String content;

    @Column(name = "board_photo_url")
    private String photoUrl;

    private String type;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @Builder
    public Board(Long id, String title, User user, Center center, String content, String photoUrl, String type, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.photoUrl = photoUrl;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
        this.center = center;

    }

    public Board() {

    }
}
