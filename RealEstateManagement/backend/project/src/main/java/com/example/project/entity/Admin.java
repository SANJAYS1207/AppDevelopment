package com.example.project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Admin{

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long id;
    
    public String username;
    public String email;
    public String password;
    public String firstName;
    public String lastName;
    public String address;
    public String phoneNumber;
}

