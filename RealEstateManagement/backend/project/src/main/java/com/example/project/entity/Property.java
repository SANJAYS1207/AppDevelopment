package com.example.project.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Property {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String type;
    private String image;
    private String sqft;
    private String location;
    private String contact;
    private String details;
    private Boolean forsale;
    private Boolean forrent;
    private LocalDate saleDate;
    private BigDecimal amount;
    private LocalDate rentDate;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal rentPerMonth;

    // @ManyToOne
    // @JsonBackReference
    // private Signinmodel user;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private Signinmodel user;
}
