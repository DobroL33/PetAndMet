package com.ssafy.petandmet.domain;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "centeritems")
@Getter
@Setter
@NoArgsConstructor
public class CenterItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "center_items_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    private String itemName;

    private String itemUrl;

    private int targetPrice;

    private int currentPrice;

    @OneToMany(mappedBy = "centerItem")
    private List<Donate> donate = new ArrayList<>();

    @Builder
    public CenterItem(Long id, Center center, String itemName, String itemUrl, int targetPrice, int currentPrice, List<Donate> donate) {
        this.id = id;
        this.center = center;
        this.itemName = itemName;
        this.itemUrl = itemUrl;
        this.targetPrice = targetPrice;
        this.currentPrice = currentPrice;
        this.donate = donate;
    }
}
