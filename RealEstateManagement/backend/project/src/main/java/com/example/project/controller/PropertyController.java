package com.example.project.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.entity.Property;
import com.example.project.services.PropertyServices;

@RestController
@CrossOrigin
@RequestMapping("/property")
public class PropertyController {

    @Autowired
    private PropertyServices propertyService;

    @PostMapping("/{user_id}")
    public ResponseEntity<Object> addProperty(@RequestBody Property property, @PathVariable Long user_id) {
        try {
            Property savedProperty = propertyService.addProperty(property, user_id);
            return ResponseEntity.ok(savedProperty);
        } catch (Exception e) {
            e.printStackTrace();  // This will print the stack trace to the console
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error adding property: " + e.getMessage());
        }
    }
    

    @GetMapping("/{id}")
    public Optional<Property> getPropertyById(@PathVariable Long id) {
        return propertyService.getPropertyById(id);
    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id, @RequestBody Property property) {
        return propertyService.updateProperty(id, property);
    }

    @DeleteMapping("/{id}")
    public void deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
    }
}
