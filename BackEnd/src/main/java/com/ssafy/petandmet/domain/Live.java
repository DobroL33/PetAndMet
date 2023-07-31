package com.ssafy.petandmet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
@NoArgsConstructor
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
    private List<Animal> animal = new ArrayList<>();

    @Builder
    public Live(Long id, String sessionName, String thumbnail, Center center, List<Animal> animal) {
        this.id = id;
        this.sessionName = sessionName;
        this.thumbnail = thumbnail;
        this.center = center;
        this.animal = animal;
    }
}
