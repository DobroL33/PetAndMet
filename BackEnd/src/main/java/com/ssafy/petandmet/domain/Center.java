package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "centers")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Center {

    @Id
    @Column(name = "center_uuid")
    private String uuid;

    @OneToOne
    @JoinColumn(name = "user_uuid")
    private User user;

    @OneToOne(mappedBy = "center")
    private Animal animal;

    @Builder.Default
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

    @Builder.Default
    @OneToMany(mappedBy = "center")
    private List<Donate> donate = new ArrayList<>();

    @OneToOne(mappedBy = "center")
    private DonateLog donateLog;

    @OneToMany(mappedBy = "center")
    private List<Live> live;

}
