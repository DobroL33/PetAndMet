package com.ssafy.petandmet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.ErrorResponse;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "boards")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    @Builder.Default
    private List<Comment> commentList = new ArrayList<>();

    private String title;

    private String content;

    @Column(name = "board_photo_url")
    private String photoUrl;

    private String type;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
