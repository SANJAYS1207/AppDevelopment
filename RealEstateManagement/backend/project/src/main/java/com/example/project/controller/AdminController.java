package com.example.project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.entity.Admin;
import com.example.project.services.AdminServices;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminServices as;

    @PostMapping
    public Admin addUser(@RequestBody Admin admin) {
        return as.addadmin(admin);
    }

    @GetMapping("/{id}")
    public Optional<Admin> showAdmin(@PathVariable Long id) {
        return as.showadmin(id);
    }

    @GetMapping("/email/{email}")
    public Admin getAdminByEmail(@PathVariable String email) {
        return as.getAdminByEmail(email);
    }

    @GetMapping
    public List<Admin> showAdmins() {
        return as.showadmins();
    }

    @PutMapping("/{id}")
    public Admin updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
        return as.updateadmin(id, adminDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        as.deleteUser(id);
    }
}
