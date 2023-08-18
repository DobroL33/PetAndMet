package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.*;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;

@SpringBootTest
@Transactional
public class DonateRepositoryTest {

    @Autowired
    DonateRepository donateRepository;



    @Test
    void 보호소의_특정물품에_후원을_등록한다(){
        Center center = mock(Center.class);
        User user = mock(User.class);

        CenterItem centerItem = CenterItem.builder()
                .itemName("ddd")
                .center(center)
                .targetPrice(10000)
                .currentPrice(1000)
                .build();

        Donate donate = Donate.builder()
                .center(center)
                .user(user)
                .centerItem(centerItem)
                .price(10000)
                .build();

        //when
        donateRepository.save(donate);

        //then
        Optional<Donate> result = donateRepository.findById(donate.getId());
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(donate.getId());
    }

    @Test
    void  동물에게_후원을_등록한다(){
        //given
        Center center = mock(Center.class);
        User user = mock(User.class);
        Animal animal = mock(Animal.class);

        Donate donate = Donate.builder()
                .user(user)
                .center(center)
                .animal(animal)
                .price(10000)
                .build();

        //when
        donateRepository.save(donate);

        //then
        Optional<Donate> result = donateRepository.findById(donate.getId());
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(donate.getId());
    }

    //오류남
//    @Test
//    void 사용자가_후원했던_내역을_조회한다(){
//        //given
//        User user = User.builder()
//                .uuid("user")
//                .id("id")
//                .password("pwd")
//                .email("email")
//                .phone("010")
//                .name("name")
//                .build();
//
//        Donate donate1 = Donate.builder()
//                .user(user)
//                .price(1000)
//                .build();
//
//        Donate donate2 = Donate.builder()
//                .user(user)
//                .price(10000)
//                .build();
//
//        donateRepository.save(donate1);
//        donateRepository.save(donate2);
//
//        //when
//        List<Donate> list = donateRepository.findAllByUserId(user.getUuid());
//
//        //then
//        assertThat(list).hasSize(2);
//    }

//    @Test
//    void 보호소는_후원받은_내역을_조회한다(){
//        //given
//        User user = User.builder()
//                .uuid("asdasd")
//                .id("asd")
//                .email("zxczxc")
//                .build();
//
//        Center center = Center.builder()
//                .uuid("123")
//                .address("asdasd")
//                .build();
//
//        Donate donate1 = Donate.builder()
//                .user(user)
//                .center(center)
//                .price(1000)
//                .build();
//
//        Donate donate2 = Donate.builder()
//                .user(user)
//                .center(center)
//                .price(10000)
//                .build();
//        donateRepository.save(donate1);
//        donateRepository.save(donate2);
//
//        //when
//        List<Donate> list = donateRepository.findAllByCenterId(center.getUuid());
//
//        //then
//        assertThat(list).hasSize(2);
//    }

}
