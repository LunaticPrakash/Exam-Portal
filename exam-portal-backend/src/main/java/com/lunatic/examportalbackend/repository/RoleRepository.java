package com.lunatic.examportalbackend.repository;

import com.lunatic.examportalbackend.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {
}
