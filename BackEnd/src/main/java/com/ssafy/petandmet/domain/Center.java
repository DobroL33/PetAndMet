package com.ssafy.petandmet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "centers")
@Getter
@Setter
//@ToString(exclude = {"user","animal","boardList","items","donate","live"}, callSuper = true)
public class Center {

    @Id
    @Column(name = "center_uuid")
    private String uuid;

    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_uuid")
    private User user;

    @JsonIgnore
    @OneToOne(mappedBy = "center", fetch = FetchType.LAZY)
    private Animal animal;

    @JsonIgnore
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

    //    ============= 다른 테이블과 연결 ================

    @JsonIgnore
    @OneToMany(mappedBy = "center")
    private List<Item> items = new ArrayList<>();

    @JsonIgnore
    @OneToOne(mappedBy = "center", fetch = FetchType.LAZY)
    private Donate donate;

    @JsonIgnore
    @OneToMany(mappedBy = "center")
    private List<Live> live;

}
