package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Donate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonateRepository extends JpaRepository<Donate, String> {
    @Query("select d from Donate d where d.user.uuid = :uuid")
    List<Donate> findAllByUserId(String uuid);

    @Query("select d from Donate d where d.center.uuid = :uuid")
    List<Donate> findAllByCenterId(String uuid);
}
