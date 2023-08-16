package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Center;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class CenterRepositoryTest {

    @Autowired
    CenterRepository centerRepository;

    @Test
    void 보호소_1개를_조회한다(){
        Center center = Center.builder()
                .uuid("aa1")
                .name("name")
                .address("bb1")
                .phone("010")
                .email("cc1")
                .build();

        centerRepository.save(center);

        //when
        Optional<Center> selectCenter = centerRepository.findById(center.getUuid());

        //then
        assertThat(selectCenter).isPresent();
        assertThat(selectCenter.get().getUuid()).isEqualTo(center.getUuid());
    }

    @Test
    void 보호소를_수정한다(){
        //given
        Center center = Center.builder()
                .uuid("aa1")
                .name("name")
                .address("bb1")
                .phone("010")
                .email("cc1")
                .build();
        Center saveCenter = centerRepository.save(center);

        //when
        saveCenter.setName("ddd");

        //then
        Optional<Center> selectCenter = centerRepository.findById(center.getUuid());
        assertThat(selectCenter).isPresent();
        assertThat(selectCenter.get().getUuid()).isEqualTo(saveCenter.getUuid());
        assertThat(selectCenter.get().getName()).isEqualTo(saveCenter.getName());
    }
}
