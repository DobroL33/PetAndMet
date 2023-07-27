package com.ssafy.petandmet.dto.donate;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
public class CreateDonateRequest {

    @JsonProperty("user_uuid")
    private String userUuid;

    @JsonProperty("animal_uuid")
    private String animalUuid;
    @JsonProperty("center_uuid")
    private String centerUuid;
    @JsonProperty("donate_price")
    private int donatePrice;

    @JsonProperty("center_item_id")
    private Long centerItemId;

    @Builder
    public CreateDonateRequest(Long centerItemId, String userUuid, String animalUuid, String centerUuid, int donatePrice) {
        this.userUuid = userUuid;
        this.animalUuid = animalUuid;
        this.centerUuid = centerUuid;
        this.donatePrice = donatePrice;
        this.centerItemId = centerItemId;
    }

//    public Donate toEntity() {
//        return Donate.builder()
//                .center(center)
//                .
//    }
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "donate_id")
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "center_uuid")
//    private Center center;
//
//    private String itemName;
//
//    private String itemUrl;
//
//    private int targetPrice;
//
//    private int currentPrice;
//
//    @OneToMany(mappedBy = "donate")
//    private List<DonateLog> donateLog = new ArrayList<>();

}
