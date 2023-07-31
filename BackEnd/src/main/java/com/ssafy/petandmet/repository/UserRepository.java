package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    @Query("select u from User u where u.id = :id")
    Optional<User> findByUserId(String id);

    @Query("select u from User u where u.uuid = :uuid")
    Optional<User> findByUserUuid(String uuid);

    @Query("select u.salt from User u where u.id = :id")
    String getSalt(String id);

    @Query("select u from User u where u.id = :id and u.password = :password")
    Optional<User> findUser(String id, String password);

    @Query("select u from User u where u.id = :id and u.email = :email")
    Optional<User> findByUserIdEmail(String id, String email);
}

