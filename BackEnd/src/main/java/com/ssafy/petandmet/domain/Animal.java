package com.ssafy.petandmet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

// 입양 상태
// 성별
// 입소 당시 나이
//
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
    @JsonIgnore
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
    private Donate donate;

    @Builder
    public Animal(String uuid, Center center, String name, int age, String specie, String breed, String findPlace, LocalDateTime enterDate, String photoUrl) {
        this.uuid = uuid;
        this.center = center;
        this.name = name;
        this.age = age;
        this.specie = specie;
        this.breed = breed;
        this.findPlace = findPlace;
        this.enterDate = enterDate;
        this.photoUrl = photoUrl;
    }

    public Animal() {

    }

    //==연관관계 메서드==//
    public void setCenter(Center center) {
        this.center = center;
        center.setAnimal(this);
    }
}
