package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Interest;
import com.ssafy.petandmet.dto.animal.InterestAnimal;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface InterestRepository extends JpaRepository<Interest, String> {
    @Query("select i from Interest i where i.user.uuid = :userUuid and i.animal.uuid = :animalUuid")
    Optional<Interest> findByUserAnimal(String userUuid, String animalUuid);

    @Query("SELECT new com.ssafy.petandmet.dto.animal.InterestAnimal" +
            "(i.animal.uuid, i.animal.name, i.animal.age, i.animal.specie, i.animal.breed, i.animal.photoUrl, i.animal.center.uuid, i.animal.enterDate)" +
            " FROM Interest i WHERE i.user.uuid = :userUuid")
    List<InterestAnimal> findInterestAnimals(Pageable pageable, String userUuid);
}

