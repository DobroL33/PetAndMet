package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "animals")
@Getter
@Setter
public class Animal {

    @Id
    @Column(name = "animal_uuid")
    private String uuid;

    @OneToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    @Column(name = "animal_name")
    private String name;

    private int age;

    private String specie;

    private String breed;

    private String findPlace;

    private LocalDateTime enterDate;

    @Column(name = "animal_photo_url")
    private String photoUrl;

    @OneToOne(mappedBy = "animal")
    private DonateLog donateLog;

    @OneToOne(mappedBy = "animal")
    private LiveAnimal liveAnimal;

    //==연관관계 메서드==//
    public void setCenter(Center center) {
        this.center = center;
        center.setAnimal(this);
    }
}
