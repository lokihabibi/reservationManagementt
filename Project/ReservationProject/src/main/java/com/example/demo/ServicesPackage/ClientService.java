package com.example.demo.ServicesPackage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.ModelsPackage.Client;
import com.example.demo.ModelsPackage.User;
import com.example.demo.RepositoryPackage.ClientRepository;

@Service
public class ClientService {
	 @Autowired
	    private ClientRepository clientRepository;

	    public Client createClient(User user) {
	        Client client = new Client();
	        client.setUser(user);
	        return clientRepository.save(client);
	    }
}
