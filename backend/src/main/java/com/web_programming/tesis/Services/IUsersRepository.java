package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Users;

import java.util.List;
import java.util.Optional;

public interface IUsersRepository {

    List<Users> getUsers();

    Users findUserById(Integer idUser);

    void saveUser(Users users);

    void DeleteUser(Integer idUser);

    Optional<Users> findByEmail(String Email);
}
