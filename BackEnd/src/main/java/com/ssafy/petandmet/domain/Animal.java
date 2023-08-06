package com.ssafy.petandmet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ssafy.petandmet.dto.animal.AdoptionStatus;
import com.ssafy.petandmet.dto.animal.CharacterType;
import com.ssafy.petandmet.dto.animal.Gender;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    @Column(name = "animal_name")
    private String name;

    private int age;

    private String specie;

    private String breed;

    private String findPlace;

    private LocalDateTime enterDate;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private int enterAge;

    @Enumerated(EnumType.STRING)
    private AdoptionStatus adoptionStatus;

    private String noticeDate;

    private LocalDateTime adotionStartDate;

    @Column(name = "animal_photo_url")
    private String photoUrl;

    @Enumerated(EnumType.STRING)
    private CharacterType characterType;

    @OneToMany(mappedBy = "animal")
    private List<Donate> donate = new ArrayList<>();

    @OneToOne(mappedBy = "animal")
    private Live live;

    @Builder
    public Animal(String uuid, Center center, String name, int age, String specie, String breed, String findPlace, LocalDateTime enterDate, Gender gender, int enterAge, AdoptionStatus adoptionStatus, String noticeDate, LocalDateTime adoptionStartDate, String photoUrl, CharacterType characterType,List<Donate> donate, Live live) {
        this.uuid = uuid;
        this.center = center;
        this.name = name;
        this.age = age;
        this.specie = specie;
        this.breed = breed;
        this.findPlace = findPlace;
        this.enterDate = enterDate;
        this.gender = gender;
        this.enterAge = enterAge;
        this.adoptionStatus = adoptionStatus;
        this.noticeDate = noticeDate;
        this.adotionStartDate = adoptionStartDate;
        this.characterType = characterType;
        this.photoUrl = photoUrl;
        this.donate = donate;
        this.live = live;
    }

    public Animal() {

    }

    //==연관관계 메서드==//
    public void setCenter(Center center) {
        this.center = center;
        center.getAnimal().add(this);
    }

    public void setLive(Live live) {
        this.live = live;
    }
}
