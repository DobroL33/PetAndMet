package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lives")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Live {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "live_id")
    private Long id;

    private String sessionName;

    @Column(name = "thumbnail_image_url")
    private String thumbnail;

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    @OneToMany(mappedBy = "live")
    @Builder.Default
    private List<Animal> animal = new ArrayList<>();
}
