package com.ssafy.petandmet.domain;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "donates")
@Getter
@Setter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Donate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donates_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "center_items_id")
    private CenterItem centerItem;

    @ManyToOne
    @JoinColumn(name = "user_uuid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "animal_uuid")
    private Animal animal;

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    @Column(name = "donate_price")
    private int price;

    @Column(name = "donate_date")
    private LocalDateTime donateDate;
}
