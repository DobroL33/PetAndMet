package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "points")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Point {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_id")
    private Long id;

    private Long pointAmount;

    private LocalDateTime pointDataTime;

    @OneToMany(mappedBy = "point")
    private List<User> user = new ArrayList<>();

}
