package com.example.demo.ServicesPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.ModelsPackage.Client;
import com.example.demo.ModelsPackage.Manager;
import com.example.demo.ModelsPackage.User;
import com.example.demo.RepositoryPackage.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ManagerService managerService;
    @Autowired
    private ClientService clientService;

    // Create a new user
    public User createUser(User user) {
        User savedUser=userRepository.save(user);
        // If the user is a manager, create a manager entity
        if (user.getRole()!=null && user.getRole().equals("manager")) {
            Manager manager=managerService.createManager(savedUser);
        }
        // If the user is a client, create a client entity
        if(user.getRole()!=null && user.getRole().equals("client"))
        {
        	Client client=clientService.createClient(savedUser);
        }
        return savedUser;
    }
    // get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    // get a user by ID
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
        Optional<User> user = userRepository.findByEmail_user(email); //the result may or may not contain a User
        if (user.isPresent() && user.get().getPasswordUser().equals(password)) {
            return user; // Login successful
        }
        return Optional.empty(); // Login failed
    }
}
