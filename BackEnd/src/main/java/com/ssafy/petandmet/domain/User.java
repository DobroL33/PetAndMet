package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {

    @Id
    @Column(name = "user_uuid")
    private String uuid;

    @OneToOne(mappedBy = "user")
    private Center center;

    @OneToOne(mappedBy = "user")
    private Interest interest;

    @OneToMany(mappedBy = "user")
    private List<Board> boardList = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    private List<Comment> commentList = new ArrayList<>();

    @Column(name = "user_id")
    private String id;

    @Column(name = "user_password")
    private String password;

    private String salt;

    @Column(name = "user_email")
    private String email;

    @Column(name = "user_name")
    private String name;

    @Enumerated(EnumType.STRING)
    private RoleType roleType;

    private int attendance;

    @Enumerated(EnumType.STRING)
    private DonateGradeType donateGrade;

    @Enumerated(EnumType.STRING)
    private WalkGradeType walkGrade;

    @OneToOne(mappedBy = "user")
    private DonateLog donateLog;

    //==연관관계 메서드==//
    public void addCenter(Center center) {
        this.center = center;
        center.setUser(this);
    }

}
