package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "lives")
@Getter
@Setter
public class Live {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "session_name")
    private String name;

    @Column(name = "thumbnail_image_url")
    private String thumbnail;

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    @OneToMany(mappedBy = "live_id")
    private List<LiveAnimals> liveAnimals;

}
