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
}
