package com.example.project.services;

import java.util.List;
import java.util.Optional;

// import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

// import com.ChessAcadamy.ChessAcademy.Repository.CoursesRepo;
import com.example.project.repository.SigninRepo;
import com.example.project.entity.Property;
// import com.ChessAcadamy.ChessAcademy.model.Courses;
import com.example.project.entity.Signinmodel;



@Service
public class SigninService implements UserDetailsService{
    @Autowired
    private SigninRepo userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException
    {
        Signinmodel user = userRepository.findByEmail(email);
        if(user!=null)
        {
            var springUser = User.withUsername(user.getEmail())
                                .password(user.getPassword())
                                .build();
            
            return springUser;
        }
        return null;
    }
    public Signinmodel saveUser(Signinmodel user) {
        return userRepository.save(user);
    }

    public List<Signinmodel> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<Signinmodel> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public boolean userExists(String email) {
        return userRepository.existsByEmail(email);
    }

    public Signinmodel validateUser(String email, String password) {
        return userRepository.findByEmailAndPassword(email, password).orElse(null);
    }
    public Optional<Signinmodel> updateUserDetails(Long id, Signinmodel updatedDetails) {
        Optional<Signinmodel> userDetailsOptional = userRepository.findById(id);
    
        if (userDetailsOptional.isPresent()) {
            Signinmodel existingUser = userDetailsOptional.get();
    
            // Update address and phone number if provided
            if (updatedDetails.getAddress() != null) {
                existingUser.setAddress(updatedDetails.getAddress());
            }
            if (updatedDetails.getPhoneNumber() != null) {
                existingUser.setPhoneNumber(updatedDetails.getPhoneNumber());
            }
    
            // Update properties if provided
            if (updatedDetails.getProperties() != null) {
                existingUser.getProperties().clear();
                for (Property property : updatedDetails.getProperties()) {
                    property.setUser(existingUser); // Set user reference in each property
                    existingUser.getProperties().add(property); // Add each property to the user's property list
                }
            }
    
            // Save the updated user details
            userRepository.save(existingUser);
        }
    
        return userDetailsOptional;
    }
    

    public Signinmodel updateProperty(Long id, List<Property> properties) {
        Optional<Signinmodel> userDetailsOptional = userRepository.findById(id);
        
        if (userDetailsOptional.isPresent()) {
            Signinmodel userDetails = userDetailsOptional.get();
            userDetails.setProperties(properties); // This sets the properties list to the user
            
            for (Property property : properties) {
                property.setUser(userDetails); // Ensure each property has the correct user reference
            }
            
            return userRepository.save(userDetails);
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }
    
    
}