package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.entity.Property;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {
}
