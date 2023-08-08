package com.ssafy.petandmet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ssafy.petandmet.domain.Point;
public interface PointRepository extends JpaRepository<Point, Long> {
}
