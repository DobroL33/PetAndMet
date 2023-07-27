package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("select a from User a where a.id = :id")
    List<User> findUserId(String id);
}

