package com.ssafy.petandmet.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "items")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CenterItem {

    @Id
    @GeneratedValue
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
    public CenterItem(Center center, String itemName, String itemUrl, int targetPrice, int currentPrice, List<Donate> donate) {
        this.center = center;
        this.itemName = itemName;
        this.itemUrl = itemUrl;
        this.targetPrice = targetPrice;
        this.currentPrice = currentPrice;
        this.donate = donate;
    }
}
