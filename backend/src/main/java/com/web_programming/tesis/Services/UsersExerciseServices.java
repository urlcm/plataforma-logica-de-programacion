package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Users;
import com.web_programming.tesis.Models.UsersExercise;
import com.web_programming.tesis.Repository.UsersExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersExerciseServices implements IUsersExerciseRepository{

    @Autowired
    public UsersExerciseRepository usersExerciseRepository;

    @Override
    public void saveUserExercise(UsersExercise usersExercise) {
        this.usersExerciseRepository.save(usersExercise);
    }

    @Override
    public List<UsersExercise> findByUser(Users user) {
        return this.usersExerciseRepository.findByUser(user);
    }

}
