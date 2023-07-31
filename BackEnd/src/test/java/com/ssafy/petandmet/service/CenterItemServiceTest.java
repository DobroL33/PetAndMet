package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.CenterItem;
import com.ssafy.petandmet.domain.Donate;
import com.ssafy.petandmet.dto.centerItem.CreateCenterItemRequest;
import com.ssafy.petandmet.dto.centerItem.UpdateCenterItemRequest;
import com.ssafy.petandmet.repository.AnimalRepository;
import com.ssafy.petandmet.repository.CenterItemRepository;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

@ExtendWith(MockitoExtension.class)
@Transactional
class CenterItemServiceTest {

//    @Mock
//    CenterItemRepository centerItemRepository;
//    @Mock
//    CenterRepository centerRepository;
//    @InjectMocks
//    CenterItemService centerItemService;
//
//    @Test
//    void 보호소는_필요_물품을_등록할수_있다() {
//        //given
//        Center center = Center.builder()
//                .uuid("ccc")
//                .email("aaa")
//                .name("bbb")
//                .address("dddd")
//                .build();
//
//        CreateCenterItemRequest request = CreateCenterItemRequest.builder()
//                                        .itemName("aa")
//                                        .itemUrl("bbb")
//                                        .itemTargetPrice(10000)
//                                        .centerUuid("ccc")
//                                        .build();
//
//        CenterItem centerItem = CenterItem.builder()
//                .center(center)
//                .itemName(request.getItemName())
//                .itemUrl(request.getItemUrl())
//                .targetPrice(request.getItemTargetPrice())
//                .build();
//
//        given(centerRepository.findById(request.getCenterUuid()))
//                .willReturn(Optional.of(center));
//        given(centerItemRepository.save(any(CenterItem.class)))
//                .willReturn(centerItem);
//
//        //when
//        Long savedId = centerItemService.addItem(request);
//
//        //then
//        then(centerRepository).should().findById(request.getCenterUuid());
//        then(centerItemRepository).should().save(any(CenterItem.class));
//
//        assertThat(savedId).isEqualTo(centerItem.getId());
//    }
//
//    @Test
//    void 보호소는_필요_물품을_삭제할수_있다() {
//        //given
//        Center center = Center.builder()
//                .uuid("ccc")
//                .email("aaa")
//                .name("bbb")
//                .address("dddd")
//                .build();
//
//        CreateCenterItemRequest request = CreateCenterItemRequest.builder()
//                .itemName("aa")
//                .itemUrl("bbb")
//                .itemTargetPrice(10000)
//                .centerUuid("ccc")
//                .build();
//
//        CenterItem centerItem = CenterItem.builder()
//                .center(center)
//                .itemName(request.getItemName())
//                .itemUrl(request.getItemUrl())
//                .targetPrice(request.getItemTargetPrice())
//                .build();
//
//        //when
//        centerItemService.removeItem(centerItem.getId());
//
//        //then
//        then(centerItemRepository).should().deleteById(centerItem.getId());
//    }
//
//    @Test
//    void 보호소는_필요_물품을_수정할수_있다() {
//        //given
//        Center center = Center.builder()
//                .uuid("ccc")
//                .email("aaa")
//                .name("bbb")
//                .address("dddd")
//                .build();
//
//        CenterItem centerItem = CenterItem.builder()
//                .center(center)
//                .itemName("ccc")
//                .itemUrl("fff")
//                .targetPrice(100000)
//                .build();
//
//        UpdateCenterItemRequest request = UpdateCenterItemRequest
//                                    .builder()
//                                    .centerItemId(centerItem.getId())
//                                    .centerUuid(center.getUuid())
//                                    .itemTargetPrice(1000)
//                                    .itemUrl("bbb")
//                                    .itemName("aa")
//                                    .build();
//
//        given(centerRepository.findById(any(String.class)))
//                .willReturn(Optional.of(center));
//        given(centerItemRepository.findById(centerItem.getId()))
//                .willReturn(Optional.of(centerItem));
//
//        //when
//        centerItemService.updateItem(request);
//
//        //then
//        then(centerRepository).should().findById(request.getCenterUuid());
//        then(centerItemRepository).should().findById(request.getCenterItemId());
//    }
//
//    @Test
//    void 보호소는_필요_물품을_조회할수_있다() {
//        //given
//        Center center = Center.builder()
//                .uuid("ccc")
//                .email("aaa")
//                .name("bbb")
//                .address("dddd")
//                .build();
//
//        CenterItem centerItem1 = CenterItem.builder()
//                .center(center)
//                .itemName("aaa")
//                .itemUrl("aa")
//                .targetPrice(1000)
//                .build();
//
//        CenterItem centerItem2 = CenterItem.builder()
//                .center(center)
//                .itemName("bbb")
//                .itemUrl("bb")
//                .targetPrice(10000)
//                .build();
//
//        CenterItem centerItem3 = CenterItem.builder()
//                .center(center)
//                .itemName("ccc")
//                .itemUrl("cc")
//                .targetPrice(100000)
//                .build();
//
//        given(centerItemRepository.findAllByCenterId(center.getUuid()))
//                .willReturn(List.of(centerItem1, centerItem2, centerItem3));
//
//        //when
//        List<CenterItem> centerItem = centerItemService.findCenterItem(center.getUuid());
//
//        //then
//        then(centerItemRepository).should().findAllByCenterId(center.getUuid());
//
//        assertThat(centerItem).hasSize(3);
//        assertThat(centerItem.get(0).getItemName()).isEqualTo("aaa");
//        assertThat(centerItem.get(1).getItemName()).isEqualTo("bbb");
//        assertThat(centerItem.get(2).getItemName()).isEqualTo("ccc");
//    }

}