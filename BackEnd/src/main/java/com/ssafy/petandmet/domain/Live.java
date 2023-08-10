package com.ssafy.petandmet.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "lives")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"center", "animal"})
public class Live {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "live_id")
    private Long id;

    private String sessionName;

    @Column(name = "thumbnail_image_url")
    private String thumbnail;

    @ManyToOne
    @JoinColumn(name = "center_uuid")
    private Center center;

    @OneToOne
    @JoinColumn(name = "animal_uuid")
    private Animal animal;

    @OneToMany(mappedBy = "live", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<CenterItem> centerItems = new ArrayList<>();

    //==연관관계 메서드==//
    public void setCenterItem(List<CenterItem> centerItems) {
        this.centerItems.clear();
        this.centerItems.addAll(centerItems);
        centerItems.stream()
                .forEach(o -> o.setLive(this));
    }
}
