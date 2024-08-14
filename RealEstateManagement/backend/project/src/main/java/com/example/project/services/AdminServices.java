package com.example.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.entity.Admin;
import com.example.project.repository.AdminRepository;

@Service
public class AdminServices {
    @Autowired
    public AdminRepository ar;

    public Admin addadmin(Admin admin) {
        return ar.save(admin);
    }

    public Optional<Admin> showadmin(Long id) {
        return ar.findById(id);
    }

    public List<Admin> showadmins() {
        return ar.findAll();
    }

    public Admin updateadmin(Long id, Admin adminDetails) {
        return ar.findById(id).map(admin -> {
            admin.setUsername(adminDetails.getUsername());
            admin.setEmail(adminDetails.getEmail());
            admin.setPassword(adminDetails.getPassword());
            admin.setFirstName(adminDetails.getFirstName());
            admin.setLastName(adminDetails.getLastName());
            admin.setAddress(adminDetails.getAddress());
            admin.setPhoneNumber(adminDetails.getPhoneNumber());
            return ar.save(admin);
        }).orElseThrow(() -> new RuntimeException("Admin not found with id " + id));
    }

    public void deleteUser(Long id) {
        ar.deleteById(id);
    }

    public Admin getAdminByEmail(String email) {
            return ar.findByEmail(email);
    }
    
}
