package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.*;
import com.ssafy.petandmet.dto.user.AnimalFriendlinessRequest;
import com.ssafy.petandmet.repository.*;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
@Transactional
public class UserServiceTest {

    @InjectMocks
    UserService userService;
    @Mock
    DonateRepository donateRepository;
    @Mock
    WalkRepository walkRepository;
    @Mock
    PointRepository pointRepository;

    @Test
    void 사용자는_동물우호도를_조회할수_있다() {
        //given

        User user = User.builder()
                .uuid("aa")
                .id("ss")
                .name("bb")
                .build();
        Animal animal = Animal.builder()
                .uuid("bb")
                .name("cc")
                .age(11)
                .build();

        AnimalFriendlinessRequest request = AnimalFriendlinessRequest.builder()
                .userUuid(user.getUuid())
                .animalUuid(animal.getUuid())
                .build();

        Long totalDonatePrice = 1000L;
        Long WalkCount = 5L;

        given(donateRepository.findTotalPriceByUserIdAndAnimalId(request.getUserUuid(), request.getAnimalUuid())).willReturn(totalDonatePrice);
        given(walkRepository.findCountByUserIdAndAnimalId(request.getUserUuid(), request.getAnimalUuid())).willReturn(WalkCount);
        //when
        Long findFriendliness = userService.findAnimalFriendliness(request);

        //then
        then(donateRepository).should().findTotalPriceByUserIdAndAnimalId(request.getUserUuid(), request.getAnimalUuid());
        then(walkRepository).should().findCountByUserIdAndAnimalId(request.getUserUuid(), request.getAnimalUuid());

        assertThat(findFriendliness).isEqualTo(51L);
    }

    @Test
    void 사용자는_충전한_마일리지를_조회할수_있다() {
        //given

        User user = User.builder()
                .uuid("aa")
                .id("ss")
                .name("bb")
                .build();

        Point point1 = Point.builder()
                .user(user)
                .pointAmount(100L)
                .pointDataTime(LocalDateTime.now())
                .build();

        Point point2 = Point.builder()
                .user(user)
                .pointAmount(1000L)
                .pointDataTime(LocalDateTime.now())
                .build();

        given(pointRepository.findMileage(user.getUuid())).willReturn(List.of(point1, point2));

         //when
        List<Point> findMileage = userService.findMileage(user.getUuid());

        //then
        then(pointRepository).should().findMileage(user.getUuid());

        assertThat(findMileage).hasSize(2);
        assertThat(findMileage.get(0).getPointAmount()).isEqualTo(100L);
        assertThat(findMileage.get(1).getPointAmount()).isEqualTo(1000L);
    }
}
