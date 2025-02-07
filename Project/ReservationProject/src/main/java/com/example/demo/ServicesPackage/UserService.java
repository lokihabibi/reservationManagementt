package com.example.demo.ServicesPackage;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.ModelsPackage.User;
import com.example.demo.RepositoryPackage.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Create a new user
    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Retrieve all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Retrieve a user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Update an existing user
    public User updateUser(User user) {
        return userRepository.save(user);
    }

    // Delete a user by ID
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> login(String email, String password) {
        Optional<User> user = userRepository.findByEmail_user(email);
        if (user.isPresent() && user.get().getPasswordUser().equals(password)) {
            return user; // Login successful
        }
        return Optional.empty(); // Login failed
    }
}
