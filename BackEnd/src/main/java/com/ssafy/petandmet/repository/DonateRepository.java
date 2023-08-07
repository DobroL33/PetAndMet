package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Donate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonateRepository extends JpaRepository<Donate, Long> {
    @Query("select d from Donate d where d.user.uuid = :uuid")
    List<Donate> findAllByUserId(String uuid);

    @Query("select sum(d.price) from Donate d where d.user.uuid = :userUuid and d.animal.uuid = :animalUuid")
    Long findTotalPriceByUserIdAndAnimalId(String userUuid, String animalUuid);

    @Query("select d from Donate d where d.center.uuid = :uuid")
    List<Donate> findAllByCenterId(String uuid);

    @Query("select sum(d.price) from Donate d where d.center.uuid = :uuid and d.centerItem.id = :id")
    Long findCenterItemDonateTotalPrice(String uuid, Long id);
}
