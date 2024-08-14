package com.example.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.project.entity.Signinmodel;

public interface SigninRepo extends JpaRepository<Signinmodel, Long> {
    public Signinmodel findByFirstname(String firstname);
    public Signinmodel findByEmail(String email);
    boolean existsByEmail(String email);
    Optional<Signinmodel> findByEmailAndPassword(String email, String password);
}