package com.ssafy.petandmet.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "donatelogs")
@Getter
@Setter
public class DonateLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "donatelog_id")
    private long id;

    @ManyToOne
    @JoinColumn(name = "donate_id")
    private Donate donate;

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
