package com.ssafy.petandmet.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "items")
@Getter
@Setter
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "center_item_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    private String itemName;

    private String itemUrl;

    private int targetPrice;

    private int currentPrice;

    @OneToMany(mappedBy = "item")
    private List<Donate> donate = new ArrayList<>();


}
