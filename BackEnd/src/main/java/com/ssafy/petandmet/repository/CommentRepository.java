package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Board;
import com.ssafy.petandmet.domain.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, String> {
    @Query("select cm from Comment cm where cm.id = :id")
    Comment findById(Long id);
}

