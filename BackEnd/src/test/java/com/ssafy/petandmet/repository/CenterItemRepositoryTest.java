package com.ssafy.petandmet.repository;


import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.CenterItem;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class CenterItemRepositoryTest {

    @Autowired
    CenterItemRepository centerItemRepository;

    @Test
    void 필요물품을_등록한다(){
        //given
        Center center = Center.builder()
                .uuid("ccc")
                .email("aaa")
                .name("bbb")
                .address("dddd")
                .build();

        CenterItem centerItem = CenterItem.builder()
                .center(center)
                .itemName("aa")
                .itemUrl("bb")
                .targetPrice(10000)
                .build();

        //when
        centerItemRepository.save(centerItem);

        //then
        Optional<CenterItem> result = centerItemRepository.findById(centerItem.getId());
        assertThat(result).isPresent();
        assertThat(result.get().getId()).isEqualTo(centerItem.getId());
    }

    @Test
    void 필요물품을_조회한다(){
        //given
        Center center = Center.builder()
                .uuid("ccc")
                .email("aaa")
                .name("bbb")
                .address("dddd")
                .build();

        CenterItem centerItem = CenterItem.builder()
                .center(center)
                .itemName("aa")
                .itemUrl("bb")
                .targetPrice(10000)
                .build();

        centerItemRepository.save(centerItem);

        //when
        Optional<CenterItem> selectCenterItem = centerItemRepository.findById(centerItem.getId());

        //then
        assertThat(selectCenterItem).isPresent();
        assertThat(selectCenterItem.get().getId()).isEqualTo(centerItem.getId());
    }

    @Test
    void 필요물품을_수정한다(){
        //given
        Center center = Center.builder()
                .uuid("ccc")
                .email("aaa")
                .name("bbb")
                .address("dddd")
                .build();

        CenterItem centerItem = CenterItem.builder()
                .center(center)
                .itemName("aa")
                .itemUrl("bb")
                .targetPrice(10000)
                .build();

        CenterItem centerItem1 = centerItemRepository.save(centerItem);

        //when
        centerItem1.setItemUrl("urlurl");

        //then
        Optional<CenterItem> selectCenterItem = centerItemRepository.findById(centerItem1.getId());
        assertThat(selectCenterItem).isPresent();
        assertThat(selectCenterItem.get().getId()).isEqualTo(centerItem.getId());
        assertThat(selectCenterItem.get().getItemUrl()).isEqualTo(centerItem.getItemUrl());
    }

    @Test
    void 특정물품을_삭제한다(){
        //given
        Center center = Center.builder()
                .uuid("ccc")
                .email("aaa")
                .name("bbb")
                .address("dddd")
                .build();

        CenterItem centerItem = CenterItem.builder()
                .center(center)
                .itemName("aa")
                .itemUrl("bb")
                .targetPrice(10000)
                .build();

        centerItemRepository.save(centerItem);

        //when
        centerItemRepository.deleteById(centerItem.getId());

        //then
        Optional<CenterItem> getCenterItem = centerItemRepository.findById(centerItem.getId());
        assertThat(getCenterItem).isEmpty();
    }
}
