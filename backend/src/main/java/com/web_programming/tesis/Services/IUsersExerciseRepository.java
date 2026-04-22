package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Users;
import com.web_programming.tesis.Models.UsersExercise;

import java.util.List;

public interface IUsersExerciseRepository {
    void saveUserExercise(UsersExercise usersExercise);

    public List<UsersExercise> findByUser(Users user);
}
