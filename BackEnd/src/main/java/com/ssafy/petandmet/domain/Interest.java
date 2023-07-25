package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "interests")
@Getter
@Setter
public class Interest {

    @Id
    @Column(name = "interest_uuid")
    private String uuid;

    @OneToOne
    @JoinColumn(name = "user_uuid")
    private User user;

    @OneToOne
    @JoinColumn(name = "animal_uuid")
    private Animal animal;

}
