package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "live_animals")
@Getter
@Setter
public class LiveAnimals {

    @Id
    private String uuid;

    @OneToOne
    @JoinColumn(name = "animal_uuid")
    private Animal animal;

    @ManyToOne
    @JoinColumn(name="live_id")
    private Live live_id;

}
