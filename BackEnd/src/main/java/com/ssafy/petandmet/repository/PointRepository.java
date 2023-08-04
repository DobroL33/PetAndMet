package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Live;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.petandmet.domain.Point;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PointRepository extends JpaRepository<Point, Long> {
    @Query("select p from Point p where p.user.uuid = :uuid")
    List<Point> findMileage(String uuid);
}
