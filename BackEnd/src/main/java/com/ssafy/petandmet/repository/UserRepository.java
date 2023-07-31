package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.Center;
import com.ssafy.petandmet.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Query("select u from User u where u.uuid = :uuid")
    User findByUuid(String uuid);
}

