package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Donate;
import com.ssafy.petandmet.domain.Interest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InterestRepository extends JpaRepository<Interest, String> {
    @Query("select i from Interest i where i.user.uuid = :userUuid and i.animal.uuid = :animalUuid")
    Optional<Interest> findByUserAnimal(String userUuid, String animalUuid);
}

