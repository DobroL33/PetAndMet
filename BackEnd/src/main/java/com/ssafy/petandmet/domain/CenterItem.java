package com.ssafy.petandmet.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "center_items")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @OneToMany(mappedBy = "centerItem", orphanRemoval = true)
    @Builder.Default
    private List<Donate> donates = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "live_id")
    private Live live;
}
