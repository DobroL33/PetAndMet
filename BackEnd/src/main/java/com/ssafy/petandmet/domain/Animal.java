package com.ssafy.petandmet.domain;

import com.ssafy.petandmet.dto.animal.AdoptionStatus;
import com.ssafy.petandmet.dto.animal.CharacterType;
import com.ssafy.petandmet.dto.animal.Gender;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "center")
public class Animal {

    @Id
    @Column(name = "animal_uuid")
    private String uuid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "center_uuid")
    private Center center;

    @Column(name = "animal_name", unique = false)
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

    private LocalDateTime adoptionStartDate;

    @Column(name = "animal_photo_url")
    private String photoUrl;

    @Enumerated(EnumType.STRING)
    private CharacterType characterType;

    @OneToMany(mappedBy = "animal")
    @Builder.Default
    private List<Donate> donate = new ArrayList<>();

    @OneToOne(mappedBy = "animal", fetch = FetchType.LAZY)
    private Live live;

    @OneToMany(mappedBy = "animal")
    @Builder.Default
    private List<Interest> interests = new ArrayList<>();

    @OneToMany(mappedBy = "animal")
    @Builder.Default
    private List<Walk> walks = new ArrayList<>();

    //==연관관계 메서드==//
    public void setCenter(Center center) {
        this.center = center;
        center.getAnimals().add(this);
    }

    public void setLive(Live live) {
        this.live = live;
    }
}
