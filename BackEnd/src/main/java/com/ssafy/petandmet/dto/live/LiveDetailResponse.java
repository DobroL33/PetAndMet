package com.ssafy.petandmet.dto.live;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.Live;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class LiveDetailResponse {

    private String message;
    private int status;
    private Long liveId;
    private String sessionName;
    private String thumbnail;
    private CenterDto center;
    private AnimalDto animal;

    public LiveDetailResponse(Live live) {
        this.message = "라이브 상세 조회 성공";
        this.status = 200;
        this.liveId = live.getId();
        this.sessionName = live.getSessionName();
        this.thumbnail = live.getThumbnail();
        this.center = new CenterDto(live.getCenter());
        this.animal = new AnimalDto(live.getAnimal());
    }

    @Data
    static class CenterDto {
        private String centerUuid;

        public CenterDto(Center center) {
            this.centerUuid = center.getUuid();
        }
    }

    @Data
    static class AnimalDto {
        private String uuid;
        private String name;
        private int age;
        private String specie;
        private String breed;
        private String findPlace;
        private LocalDateTime enterDate;
        private String photoUrl;

        public AnimalDto(Animal animal) {
            this.uuid = animal.getUuid();
            this.name = animal.getName();
            this.age = animal.getAge();
            this.specie = animal.getSpecie();
            this.breed = animal.getBreed();
            this.findPlace = animal.getFindPlace();
            this.enterDate = animal.getEnterDate();
            this.photoUrl = animal.getPhotoUrl();
        }
    }
}