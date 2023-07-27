package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.CenterItem;
import com.ssafy.petandmet.domain.Donate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CenterItemRepository extends JpaRepository<CenterItem, Long> {

    @Query("select ci from CenterItem ci where ci.center.uuid = :uuid")
    List<CenterItem> findAllByCenterId(String uuid);
}
