package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Center;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CenterRepository extends JpaRepository<Center, String> {

    @Query("select c from Center c where c.uuid = :uuid")
    Center findByUuid(String uuid);

}

