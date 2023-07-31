package com.ssafy.petandmet.service;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.dto.animal.CreateAnimalRequest;
import com.ssafy.petandmet.dto.animal.UpdateAnimalRequest;
import com.ssafy.petandmet.repository.AnimalRepository;
import com.ssafy.petandmet.repository.CenterRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
@Transactional
public class AnimalServiceTest {

//    @Mock
//    CenterRepository centerRepository;
//    @Mock
//    AnimalRepository animalRepository;
//    @InjectMocks
//    private AnimalService animalService;
//
//    @Test
//    void 동물을_전체_목록을_조회_할수있다() {
//        //given
//        Animal animal1 = Animal.builder()
//                .uuid("1")
//                .name("1")
//                .specie("specie1")
//                .breed("breed1")
//                .age(1)
//                .build();
//
//        Animal animal2 = Animal.builder()
//                .uuid("2")
//                .name("2")
//                .specie("specie2")
//                .breed("breed2")
//                .age(2)
//                .build();
//
//        Animal animal3 = Animal.builder()
//                .uuid("3")
//                .name("3")
//                .specie("specie3")
//                .breed("breed3")
//                .age(3)
//                .build();
//        Pageable pageable = PageRequest.of(0, 5);
//
//        given(animalRepository.findAll(pageable))
//                .willReturn(new PageImpl<>(List.of(animal1, animal2, animal3)));
//
//        //when
//        Page<Animal> findAnimals = animalService.findAll(pageable);
//
//        //then
//        then(animalRepository).should().findAll(pageable);
//
//        assertThat(findAnimals).hasSize(3);
//        List<Animal> findAnimalsContent = findAnimals.getContent();
//        assertThat(findAnimalsContent.get(0).getName()).isEqualTo("1");
//        assertThat(findAnimalsContent.get(0).getSpecie()).isEqualTo("specie1");
//        assertThat(findAnimalsContent.get(0).getAge()).isEqualTo(1);
//        assertThat(findAnimalsContent.get(0).getBreed()).isEqualTo("breed1");
//    }
//    @Test
//    void 동물을_필터링_조회_할수있다() {
//        //given
//        Animal animal1 = Animal.builder()
//                .uuid("1")
//                .name("1")
//                .specie("specie")
//                .breed("breed")
//                .age(123)
//                .build();
//
//        Map<String, String> map = new HashMap<>();
//        map.put("name", "hi");
//        map.put("specie", "specie");
//        map.put("breed", "breed");
//
//        given(animalRepository.findAnimalBySearch("hi", "specie", "breed"))
//                .willReturn(List.of(animal1));
//        //when
//        List<Animal> findAnimals = animalService.findAnimalBySearch(map);
//
//        //then
//        then(animalRepository).should().findAnimalBySearch("hi", "specie", "breed");
//
//        assertThat(findAnimals).hasSize(1);
//        assertThat(findAnimals.get(0).getName()).isEqualTo("1");
//        assertThat(findAnimals.get(0).getSpecie()).isEqualTo("specie");
//        assertThat(findAnimals.get(0).getAge()).isEqualTo(123);
//        assertThat(findAnimals.get(0).getBreed()).isEqualTo("breed");
//    }
//    @Test
//    void 동물을_등록할수있다() {
//        //given
//        Animal animal = Animal.builder()
//                .uuid("123")
//                .name("hi")
//                .age(123)
//                .build();
//
//        CreateAnimalRequest request = CreateAnimalRequest.builder()
//                        .name("111").specie("111").breed("111").age(12).build();
//
//        Center center = Center.builder()
//                .uuid("aa")
//                .address("bb")
//                .email("cc")
//                .build();
//
//        given(centerRepository.findByUuid(request.getCenterUuid())).willReturn(center);
//        given(animalRepository.save(any(Animal.class))).willReturn(animal);
//        //when
//        String join = animalService.join(request);
//
//        //then
//        then(centerRepository).should().findByUuid(request.getCenterUuid());
//        then(animalRepository).should().save(animal);
//
//        assertThat(join).isEqualTo(animal.getUuid());
//    }
//
//    @Test
//    void 특정_동물을_조회할수있다() {
//        //given
//        Animal animal = Animal.builder()
//                .uuid("123")
//                .name("hi")
//                .age(123)
//                .build();
//
//        given(animalRepository.findById("123")).willReturn(Optional.of(animal));
//
//        //when
//        Optional<Animal> findAnimal = animalService.findOne("123");
//
//        //then
//        then(animalRepository).should().findById("123");
//
//        assertThat(findAnimal.get()).isEqualTo(animal);
//    }
//
//    @Test
//    void 특정_동물을_삭제할수있다() {
//        //given
//        Animal animal = Animal.builder()
//                .uuid("123")
//                .name("hi")
//                .age(123)
//                .build();
//
//        given(animalRepository.findById("123")).willReturn(Optional.of(animal));
//
//        //when
//        Optional<String> deleteId = animalService.delete("123");
//
//        //then
//        then(animalRepository).should().findById("123");
//        then(animalRepository).should().delete(animal);
//
//        assertThat(deleteId.get()).isEqualTo("123");
//    }
//
//    @Test
//    void 특정_동물을_수정할수있다() {
//        //given
//        Animal animal = Animal.builder()
//                .uuid("123")
//                .name("hi")
//                .age(123)
//                .build();
//
//        given(animalRepository.findById("123")).willReturn(Optional.of(animal));
//
//        UpdateAnimalRequest dto = UpdateAnimalRequest.builder()
//                .uuid("123")
//                .name("hello")
//                .age(123)
//                .specie("specie")
//                .breed("breed")
//                .findPlace("findPlace")
//                .centerUuid("123123123")
//                .enteredDate(LocalDateTime.now())
//                .build();
//
//        //when
//        animalService.update(dto);
//
//        //then
//        then(animalRepository).should().findById("123");
//    }

}