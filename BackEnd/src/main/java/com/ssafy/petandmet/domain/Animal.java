package com.ssafy.petandmet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
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
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "center")
public class Animal {

    @Id
    @Column(name = "animal_uuid")
    private String uuid;

    @OneToOne
    @JoinColumn(name = "center_uuid")
    @JsonIgnore
    private Center center;

    @Column(name = "animal_name", unique = false)
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

    @ManyToOne
    @JoinColumn(name = "live_id")
    private Live live;

    @OneToOne(mappedBy = "animal", fetch = FetchType.LAZY)
    private Interest interest;

    //==연관관계 메서드==//
    public void setCenter(Center center) {
        this.center = center;
        center.setAnimal(this);
    }
}
