package com.lunatic.examportalbackend.repository;

import com.lunatic.examportalbackend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}
