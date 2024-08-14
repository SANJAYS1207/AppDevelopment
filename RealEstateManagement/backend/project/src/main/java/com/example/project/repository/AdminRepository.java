package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.project.entity.Admin;

public interface AdminRepository extends JpaRepository<Admin,Long>{
    
    @Query("SELECT u FROM Admin u WHERE u.email = ?1")
    Admin findByEmail(String email);
}
