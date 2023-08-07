package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Animal;
import com.ssafy.petandmet.domain.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    @Query("select b from Board b where b.title = :title")
    List<Board> findByTitle(String title);

    @Query("select b from Board b where b.type = :type and b.center.uuid= :uuid ORDER BY b.id")
    Page<Board> findBoardByType(String uuid, String type, Pageable pageable);


}

