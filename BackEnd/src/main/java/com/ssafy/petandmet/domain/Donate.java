package com.ssafy.petandmet.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "donates")
@Getter
@Setter
public class Donate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donate_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    private String itemName;

    private String itemUrl;

    private int targetPrice;

    private int currentPrice;

    @OneToMany(mappedBy = "donate")
    private List<DonateLog> donateLog = new ArrayList<>();


}
