package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Board;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class AnimalRepositoryTest {

    @Autowired
    AnimalRepository animalRepository;

    @Test
    void 동물을_등록한다(){
        //given
        Animal animal = Animal.builder()
                .uuid("123")
                .name("hi")
                .age(123)
                .build();

        //when
        animalRepository.save(animal);

        //then
        Optional<Animal> result = animalRepository.findById(animal.getUuid());
        assertThat(result).isPresent();
        assertThat(result.get().getName()).isEqualTo(animal.getName());
    }

    @Test
    void 특정동물을_조회한다(){
        //given
        Animal animal = Animal.builder()
                .uuid("123")
                .name("hi")
                .age(123)
                .build();
        animalRepository.save(animal);

        //when
        Optional<Animal> selectAnimal = animalRepository.findById("123");

        //then
        assertThat(selectAnimal).isPresent();
        assertThat(selectAnimal.get().getName()).isEqualTo("hi");
    }

    @Test
    void 동물을_수정한다(){
        //given
        Animal animal = Animal.builder()
                .uuid("123")
                .name("hi")
                .age(123)
                .build();

        Animal animal1 = animalRepository.save(animal);

        //when
        animal1.setAge(456);

        //then
        Optional<Animal> selectAnimal = animalRepository.findById(animal.getUuid());
        assertThat(selectAnimal).isPresent();
        assertThat(selectAnimal.get().getUuid()).isEqualTo(animal1.getUuid());
        assertThat(selectAnimal.get().getAge()).isEqualTo(animal1.getAge());
    }

    @Test
    void 동물을_삭제한다(){
        //given
        Animal animal = Animal.builder()
                .uuid("123")
                .name("hi")
                .age(123)
                .build();

        animalRepository.save(animal);

        //when
        animalRepository.deleteById(animal.getUuid());

        //then
        Optional<Animal> getAnimal = animalRepository.findById(animal.getUuid());
        assertThat(getAnimal).isEmpty();
    }

}
