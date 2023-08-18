package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.Live;
import com.ssafy.petandmet.domain.User;
import com.ssafy.petandmet.repository.AnimalRepository;
import com.ssafy.petandmet.repository.LiveRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.annotation.Rollback;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
@Transactional
class LiveServiceTest {

//    @Mock
//    LiveRepository liveRepository;
//    @InjectMocks
//    private LiveService liveService;
//
//    @Test
//    void 현재_라이브_중인_방송을_전체_조회_할수있다() {
//        //given
//        Live live1 = Live.builder()
//                .sessionName("a")
//                .thumbnail("aaa")
//                .build();
//
//        Live live2 = Live.builder()
//                .sessionName("b")
//                .thumbnail("bbb")
//                .build();
//
//        Live live3 = Live.builder()
//                .sessionName("c")
//                .thumbnail("ccc")
//                .build();
//
//        Pageable pageable = PageRequest.of(0, 5);
//
//        given(liveRepository.findAll(pageable))
//                .willReturn(new PageImpl<>(List.of(live1, live2, live3)));
//
//        //when
//        Page<Live> liveList = liveService.findLiveList(pageable);
//
//        //then
//        then(liveRepository).should().findAll(pageable);
//
//        assertThat(liveList).hasSize(3);
//        List<Live> findLiveContent = liveList.getContent();
//        assertThat(findLiveContent.get(0).getSessionName()).isEqualTo("a");
//        assertThat(findLiveContent.get(1).getSessionName()).isEqualTo("b");
//        assertThat(findLiveContent.get(2).getSessionName()).isEqualTo("c");
//        assertThat(findLiveContent.get(0).getThumbnail()).isEqualTo("aaa");
//        assertThat(findLiveContent.get(1).getThumbnail()).isEqualTo("bbb");
//        assertThat(findLiveContent.get(2).getThumbnail()).isEqualTo("ccc");
//    }
//
//
//    @Test
//    void 센터별_필터링된_방송을_조회_할수있다() {
//
//        Center center = Center.builder()
//                .uuid("asdasd")
//                .email("aaa")
//                .name("bbb")
//                .address("ccc")
//                .build();
//
//        //given
//        Live live1 = Live.builder()
//                .sessionName("a")
//                .thumbnail("aaa")
//                .center(center)
//                .build();
//
//        Live live2 = Live.builder()
//                .sessionName("b")
//                .thumbnail("bbb")
//                .center(center)
//                .build();
//
//        given(liveRepository.findLiveListByCenter(center.getUuid()))
//                .willReturn(List.of(live1, live2));
//
//        //when
//        List<Live> liveListByCenter = liveService.findLiveListByCenter(center.getUuid());
//
//        //then
//        then(liveRepository).should().findLiveListByCenter(center.getUuid());
//
//        assertThat(liveListByCenter).hasSize(2);
//        assertThat(liveListByCenter.get(0).getSessionName()).isEqualTo("a");
//        assertThat(liveListByCenter.get(1).getSessionName()).isEqualTo("b");
//        assertThat(liveListByCenter.get(0).getThumbnail()).isEqualTo("aaa");
//        assertThat(liveListByCenter.get(1).getThumbnail()).isEqualTo("bbb");
//    }
//
//    @Test
//    void 특정_방송을_상세_조회_할수있다() {
//
//        //given
//        Center center = Center.builder()
//                .uuid("asdasd")
//                .email("aaa")
//                .name("bbb")
//                .address("ccc")
//                .build();
//
//        Live live1 = Live.builder()
//                .sessionName("a")
//                .thumbnail("aaa")
//                .center(center)
//                .build();
//
//        given(liveRepository.findLiveDetail(live1.getId()))
//                .willReturn(live1);
//
//        //when
//        Live liveDetail = liveService.findLiveDetail(live1.getId());
//
//        //then
//        then(liveRepository).should().findLiveDetail(live1.getId());
//
//        assertThat(liveDetail.getSessionName()).isEqualTo("a");
//        assertThat(liveDetail.getThumbnail()).isEqualTo("aaa");
//        assertThat(liveDetail.getCenter().getUuid()).isEqualTo("asdasd");
//    }


}