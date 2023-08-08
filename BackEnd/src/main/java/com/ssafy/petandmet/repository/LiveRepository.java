package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Live;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LiveRepository extends JpaRepository<Live, Long> {
    @Query("select l from Live l where l.center.uuid = :uuid")
    List<Live> findLiveListByCenter(String uuid);

    @Query("select l from Live l join fetch l.animal a where l.id = :id")
    Live findLiveDetail(Long id);
}

