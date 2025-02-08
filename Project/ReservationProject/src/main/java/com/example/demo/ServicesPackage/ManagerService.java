package com.example.demo.ServicesPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.ModelsPackage.Manager;
import com.example.demo.RepositoryPackage.ManagerRepository;
import com.example.demo.ModelsPackage.User; // added import statement for User

@Service
public class ManagerService {
    
    @Autowired
    private ManagerRepository managerRepository;

    public Manager createManager(User user) {
        Manager manager = new Manager();
        manager.setUser(user);
        return managerRepository.save(manager);
    }
}
