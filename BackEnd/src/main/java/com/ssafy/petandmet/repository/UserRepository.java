package com.ssafy.petandmet.repository;

import com.ssafy.petandmet.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

    @Query("select u from User u where u.uuid = :uuid")
    Optional<User> findByUserUuid(String uuid);

    @Query("select u from User u where u.id = :id")
    Optional<User> findByUserId(String id);

    @Query("select u from User u where u.id = :id and u.email = :email")
    Optional<User> findByUserIdEmail(String id, String email);

    @Query("select u from User u where u.email = :email")
    Optional<User> findByUserEmail(String email);

    @Query("update User u set u.photoUrl = :fileName where u.uuid = :uuid")
    @Modifying
    void updatePhotoUrl(String uuid, String fileName);

    @Query("select u.photoUrl from User u where u.uuid = :uuid")
    Optional<String> getPhotoUrl(String uuid);

    @Query("select u.mileage from User u where u.uuid = :uuid")
    Long findMileage(String uuid);

    @Query("select u.center.uuid from User u where u.uuid = :userUuid")
    Optional<String> getCenterUuid(String userUuid);
}

