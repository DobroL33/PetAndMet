package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.RoleType;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.dto.center.UpdateCenterRequest;
import com.ssafy.petandmet.repository.CenterRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@Transactional
public class CenterServiceTest {
    @Mock
    CenterRepository centerRepository;
    @InjectMocks
    private CenterService centerService;

    @Test
    void 보호소를_전체조회_할수있다(){
        //given
        Center center1 = Center.builder()
                .uuid("aa1")
                .address("bb1")
                .email("cc1")
                .build();
        Center center2 = Center.builder()
                .uuid("aa2")
                .address("bb2")
                .email("cc2")
                .build();
        Center center3 = Center.builder()
                .uuid("aa3")
                .address("bb3")
                .email("cc3")
                .build();
        Pageable pageable = PageRequest.of(0,5);

        given(centerRepository.findAll(pageable))
                .willReturn(new PageImpl<>(List.of(center1, center2, center3)));

        //when
        Page<Center> findCenters = centerService.findAll(pageable);

        //then
        then(centerRepository).should().findAll(pageable);

        assertThat(findCenters).hasSize(3);
        List<Center> findCentersContent = findCenters.getContent();
        assertThat(findCentersContent.get(0).getUuid()).isEqualTo("aa1");
        assertThat(findCentersContent.get(0).getAddress()).isEqualTo("bb1");
        assertThat(findCentersContent.get(0).getEmail()).isEqualTo("cc1");
        System.out.println("보호소 전체조회를 성공했습니다.");
    }

    @Test
    void 보호소_상세조회를_할수있다(){
        //given
        Center center = Center.builder()
                .uuid("aa1")
                .address("bb1")
                .email("cc1")
                .build();
        given(centerRepository.findById("aa1")).willReturn(Optional.of(center));

        //when
        Optional<Center> findCenter = centerService.findOne("aa1");

        //then
        then(centerRepository).should().findById("aa1");

        assertThat(findCenter.get()).isEqualTo(center);

        System.out.println("보호소 상세조회를 성공했습니다.");
    }

    @Test
    void 보호소를_수정할수있다() {
        //given
        Center center = Center.builder()
                .uuid("aa1")
                .address("bb1")
                .email("cc1")
                .build();

        given(centerRepository.findById("aa1")).willReturn(Optional.of(center));

        UpdateCenterRequest dto = UpdateCenterRequest.builder()
                .uuid("aa1")
                .address("bb12")
                .email("cc12")
                .build();

        //when
        centerService.update(dto);

        //then
        then(centerRepository).should().findById("aa1");
        System.out.println("보호소 수정을 성공했습니다.");
    }
}
