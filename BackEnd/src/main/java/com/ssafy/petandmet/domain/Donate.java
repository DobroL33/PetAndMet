package com.ssafy.petandmet.domain;


import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "donates")
@Getter
@Setter
public class Donate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donates_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "center_items_id")
    private CenterItem centerItem;

    @OneToOne
    @JoinColumn(name = "user_uuid")
    private User user;

    @OneToOne
    @JoinColumn(name = "animal_uuid")
    private Animal animal;

    @OneToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    @Column(name = "donate_price")
    private int price;

    @Column(name = "donate_date")
    private LocalDateTime donateDate;

    public Donate() {};
    @Builder
    public Donate(long id, CenterItem centerItem, User user, Animal animal, Center center, int price, LocalDateTime donateDate) {
        this.id = id;
        this.centerItem = centerItem;
        this.user = user;
        this.animal = animal;
        this.center = center;
        this.price = price;
        this.donateDate = donateDate;
    }
}
