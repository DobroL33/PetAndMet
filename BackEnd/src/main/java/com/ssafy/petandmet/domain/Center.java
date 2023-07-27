package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "centers")
@Getter
@Setter
@NoArgsConstructor
@ToString(exclude = "user")
public class Center {

    @Id
    @Column(name = "center_uuid")
    private String uuid;

    @OneToOne(fetch = FetchType.LAZY)
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

    @Builder
    public Center(String uuid, User user, Animal animal, List<Board> boardList, String name, String address, String phone, String email, List<Donate> donate, DonateLog donateLog, List<Live> live) {
        this.uuid = uuid;
        this.user = user;
        this.animal = animal;
        this.boardList = boardList;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.email = email;
        this.donate = donate;
        this.donateLog = donateLog;
        this.live = live;
    }

    //    ============= 다른 테이블과 연결 ================

    @OneToMany(mappedBy = "center")
    private List<Donate> donate = new ArrayList<>();

    @OneToOne(mappedBy = "center")
    private DonateLog donateLog;

    @OneToMany(mappedBy = "center")
    private List<Live> live;

}
