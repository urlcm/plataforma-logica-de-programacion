package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Users;
import com.web_programming.tesis.Repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersServices implements IUsersRepository {

    @Autowired
    private UsersRepository usersRepository;

    @Override
    public List<Users> getUsers() {
        return this.usersRepository.findAll();
    }

    @Override
    public Users findUserById(Integer idUser) {
        return this.usersRepository.findById(idUser).orElse(null);
    }


    @Override
    public void saveUser(Users users) {
        this.usersRepository.save(users);
    }

    @Override
    public void DeleteUser(Integer idUser) {
        this.usersRepository.deleteById(idUser);
    }

    @Override
    public Optional<Users> findByEmail(String email) {
        return this.usersRepository.findByEmail(email);
    }

}


