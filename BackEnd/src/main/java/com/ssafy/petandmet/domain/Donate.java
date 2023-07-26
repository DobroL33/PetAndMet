package com.ssafy.petandmet.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "donates")
@Getter
@Setter
public class Donate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

//    @Column(name = "item_name")
    private String item_name;

//    @Column(name = "item_url")
    private String item_url;

//    @Column(name = "target_price")
    private int target_price;

//    @Column(name = "current_price")
    private int current_price;

    @OneToMany(mappedBy = "donate_id")
    private List<DonateLog> donateLog;


}
