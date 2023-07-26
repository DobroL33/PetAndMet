package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boards")
@Getter
@Setter
public class Board {

    @Id
    @Column(name = "board_uuid")
    private String uuid;

    @ManyToOne
    @JoinColumn(name = "user_uuid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    @OneToMany(mappedBy = "board")
    private List<Comment> commentList = new ArrayList<>();

    private String title;

    private String content;

    @Column(name = "board_photo_url")
    private String photoUrl;

    private String type;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;


}
