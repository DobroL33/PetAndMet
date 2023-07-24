package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "animals")
@Getter
@Setter
public class Animal {

    @Id
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

    //==연관관계 메서드==//
    public void setCenter(Center center) {
        this.center = center;
        center.setAnimal(this);
    }
}
