package com.ssafy.petandmet.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "centers")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"user", "animals"})
public class Center {

    @Id
    @Column(name = "center_uuid")
    private String uuid;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_uuid")
    private User user;

    @OneToMany(mappedBy = "center", fetch = FetchType.LAZY)
    @Builder.Default
    private List<Animal> animals = new ArrayList<>();

    @OneToMany(mappedBy = "center")
    @Builder.Default
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

    @OneToMany(mappedBy = "center")
    @Builder.Default
    private List<CenterItem> centerItem = new ArrayList<>();

    @OneToMany(mappedBy = "center")
    @Builder.Default
    private List<Donate> donate = new ArrayList<>();

    @OneToMany(mappedBy = "center")
    @Builder.Default
    private List<Live> live = new ArrayList<>();
}
