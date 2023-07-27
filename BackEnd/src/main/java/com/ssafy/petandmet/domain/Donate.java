package com.ssafy.petandmet.domain;


import jakarta.persistence.*;
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
    @Column(name = "donate_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "center_item_id")
    private Item item;

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

}
