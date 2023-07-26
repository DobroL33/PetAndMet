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

//    @Column(name = "item_name")
    private String itemName;

//    @Column(name = "item_url")
    private String itemUrl;

//    @Column(name = "target_price")
    private int targetPrice;

//    @Column(name = "current_price")
    private int currentPrice;

    @OneToMany(mappedBy = "donate_id")
    private List<DonateLog> donateLog = new ArrayList<>();


}
