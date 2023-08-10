package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Walk;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface WalkRepository  extends JpaRepository<Walk, String> {

    @Query("select count(w) from Walk w where w.user.uuid = :userUuid and w.animal.uuid = :animalUuid and w.flag = true")
    Long findCountByUserIdAndAnimalId(String userUuid, String animalUuid);

    @Query("select w.time from Walk w where w.date = :date and w.animal.uuid = :animalUuid and w.user.uuid = :userUuid")
    List<Integer> findWalkTimeByUserAndAnimal(String animalUuid, String userUuid, LocalDate date);
}
