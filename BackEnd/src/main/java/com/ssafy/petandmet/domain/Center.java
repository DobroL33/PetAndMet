package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "centers")
@Getter
@Setter
public class Center {

    @Id
    @Column(name = "center_uuid")
    private String uuid;

    @OneToOne
    @JoinColumn(name = "user_uuid")
    private User user;

    @OneToOne(mappedBy = "center")
    private Animal animal;

    @OneToMany(mappedBy = "center")
    private List<Board> boardList = new ArrayList<>();

    @Column(name = "center_name")
    private String name;

    @Column(name = "center_address")
    private String address;

    @Column(name = "center_phone")
    private String phone;

    @Column(name = "center_email")
    private String email;




}
