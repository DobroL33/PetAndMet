package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.dto.animal.AdoptionStatus;
import com.ssafy.petandmet.dto.animal.FindAnimalBySearchResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, String> {

    @Query("select a from Animal a where a.name = :name")
    List<Animal> findByName(String name);

    @Query("SELECT a FROM Animal a where (:name is null or a.name = :name) and (:specie is null or a.specie = :specie) and (:breed is null or a.breed = :breed) and (:centerUuid is null or a.center.uuid = :centerUuid) and (:adoptionStatus is null or a.adoptionStatus = :adoptionStatus)")
    Page<Animal> findAnimalBySearch(String name, String specie, String breed, String centerUuid, AdoptionStatus adoptionStatus, Pageable pageable);





    @Query("select count(a) from Animal a where a.center.uuid = :uuid")
    Long findTotalCount(String uuid);
}

