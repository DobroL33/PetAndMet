package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.*;
import com.ssafy.petandmet.dto.donate.CreateDonateRequest;
import com.ssafy.petandmet.repository.*;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.mock;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
@Transactional
class DonateServiceTest {
    @InjectMocks
    DonateService donateService;
    @Mock
    DonateRepository donateRepository;
    @Mock
    CenterItemRepository centerItemRepository;
    @Mock
    CenterRepository centerRepository;
    @Mock
    UserRepository userRepository;
    @Mock
    AnimalRepository animalRepository;
    @Test
    void 후원을_등록할수있다() {
        //given
        Center center = mock(Center.class);
        User user = mock(User.class);
        Animal animal = mock(Animal.class);
        CenterItem centerItem = mock(CenterItem.class);

        Donate donate = Donate.builder()
                        .center(center)
                        .animal(animal)
                        .user(user)
                        .centerItem(centerItem)
                        .price(10000)
                        .build();

        CreateDonateRequest request = CreateDonateRequest.builder()
                .userUuid("asdasd")
                .animalUuid("123123123")
                .centerItemId(1L)
                .centerUuid("sdfsdf")
                .build();


        given(centerRepository.findById(request.getCenterUuid())).willReturn(Optional.of(center));
        given(userRepository.findById(request.getUserUuid())).willReturn(Optional.of(user));
        given(animalRepository.findById(request.getAnimalUuid())).willReturn(Optional.of(animal));
        given(centerItemRepository.findById(request.getCenterItemId())).willReturn(Optional.of(centerItem));
        given(donateRepository.save(any(Donate.class))).willReturn(donate);

        //when
        Long savedId = donateService.add(request);

        //then
        then(centerRepository).should().findById(request.getCenterUuid());
        then(userRepository).should().findById(request.getUserUuid());
        then(animalRepository).should().findById(request.getAnimalUuid());
        then(centerItemRepository).should().findById(request.getCenterItemId());
        then(donateRepository).should().save(any(Donate.class));

        assertThat(savedId).isEqualTo(donate.getId());
    }

    @Test
    void 사용자는_후원_가능한_물품을_조회할수_있다() {
        //given
        Center center = Center.builder()
                .uuid("123")
                .address("asdasd")
                .build();

        CenterItem centerItem1 = CenterItem.builder()
                .itemName("asdasdasd")
                .currentPrice(1000)
                .targetPrice(10000)
                .build();

        CenterItem centerItem2 = CenterItem.builder()
                .itemName("qweqweqwe")
                .currentPrice(1000)
                .targetPrice(10000)
                .build();

        given(centerItemRepository.findAllByCenterId(center.getUuid())).willReturn(List.of(centerItem1, centerItem2));

        //when
        List<CenterItem> possibleItem = donateService.findPossibleItem(center.getUuid());

        //then
        then(centerItemRepository).should().findAllByCenterId(center.getUuid());

        assertThat(possibleItem).hasSize(2);
        assertThat(possibleItem.get(0).getItemName()).isEqualTo("asdasdasd");
        assertThat(possibleItem.get(1).getItemName()).isEqualTo("qweqweqwe");
    }

    @Test
    void 사용자는_후원했던_내역을_조회_할수있다() {
        //given
        User user = User.builder()
                .uuid("asdasd")
                .id("asd")
                .email("zxczxc")
                .build();

        Donate donate1 = Donate.builder()
                .user(user)
                .price(1000)
                .build();

        Donate donate2 = Donate.builder()
                .user(user)
                .price(10000)
                .build();

        given(donateRepository.findAllByUserId(user.getUuid())).willReturn(List.of(donate1, donate2));

        //when
        List<Donate> donate = donateService.findDonate(user.getUuid());

        //then
        then(donateRepository).should().findAllByUserId(user.getUuid());

        assertThat(donate).hasSize(2);
        assertThat(donate.get(0).getPrice()).isEqualTo(1000);
        assertThat(donate.get(1).getPrice()).isEqualTo(10000);
    }

    @Test
    void 보호소는_후원받은_내역을_조회_할수있다() {
        //given
        User user = User.builder()
                .uuid("asdasd")
                .id("asd")
                .email("zxczxc")
                .build();

        Center center = Center.builder()
                .uuid("123")
                .address("asdasd")
                .build();

        Donate donate1 = Donate.builder()
                .user(user)
                .center(center)
                .price(1000)
                .build();

        Donate donate2 = Donate.builder()
                .user(user)
                .center(center)
                .price(10000)
                .build();

        given(donateRepository.findAllByCenterId(center.getUuid())).willReturn(List.of(donate1, donate2));

        //when
        List<Donate> responseDonate = donateService.findResponseDonate(center.getUuid());

        //then
        then(donateRepository).should().findAllByCenterId(center.getUuid());

        assertThat(responseDonate).hasSize(2);
        assertThat(responseDonate.get(0).getPrice()).isEqualTo(1000);
        assertThat(responseDonate.get(1).getPrice()).isEqualTo(10000);
    }
}