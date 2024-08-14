package com.example.project.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.entity.Property;
import com.example.project.entity.Signinmodel;
import com.example.project.repository.PropertyRepository;
import com.example.project.repository.SigninRepo;

@Service
public class PropertyServices {

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private SigninRepo userRepo;

    public Property addProperty(Property property, Long user_id) {
        Optional<Signinmodel> optionalUser = userRepo.findById(user_id);
        if (optionalUser.isPresent()) {
            property.setUser(optionalUser.get());
            return propertyRepository.save(property);
        } else {
            throw new RuntimeException("User not found with id " + user_id);
        }
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property updateProperty(Long id, Property propertyDetails) {
        return propertyRepository.findById(id).map(property -> {
            property.setType(propertyDetails.getType());
            property.setImage(propertyDetails.getImage());
            property.setSqft(propertyDetails.getSqft());
            property.setLocation(propertyDetails.getLocation());
            property.setContact(propertyDetails.getContact());
            property.setDetails(propertyDetails.getDetails());
            property.setForsale(propertyDetails.getForsale());
            property.setForrent(propertyDetails.getForrent());
            property.setSaleDate(propertyDetails.getSaleDate());
            property.setAmount(propertyDetails.getAmount());
            property.setRentDate(propertyDetails.getRentDate());
            property.setStartDate(propertyDetails.getStartDate());
            property.setEndDate(propertyDetails.getEndDate());
            property.setRentPerMonth(propertyDetails.getRentPerMonth());
            return propertyRepository.save(property);
        }).orElseThrow(() -> new RuntimeException("Property not found with id " + id));
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}
