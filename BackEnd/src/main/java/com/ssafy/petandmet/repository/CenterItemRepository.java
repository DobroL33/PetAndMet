package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.CenterItem;
import com.ssafy.petandmet.dto.centerItem.CenterItemResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CenterItemRepository extends JpaRepository<CenterItem, Long> {

    @Query("SELECT new com.ssafy.petandmet.dto.centerItem.CenterItemResponse" +
            "(ci.id, ci.center.uuid, ci.itemName,ci.itemUrl,ci.targetPrice)" +
            " from CenterItem as ci where ci.center.uuid = :uuid")
    List<CenterItemResponse> findAllByCenterId(String uuid);


}
