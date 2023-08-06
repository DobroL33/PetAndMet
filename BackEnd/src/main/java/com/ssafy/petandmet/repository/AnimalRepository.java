package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Animal;
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

    @Query("select a from Animal a where a.name = :name and a.specie = :specie and a.breed = :breed")
    List<Animal> findAnimalBySearch(String name, String specie, String breed);

    @Query("select count(a) from Animal a where a.center.uuid = :uuid")
    Long findTotalCount(String uuid);
}

