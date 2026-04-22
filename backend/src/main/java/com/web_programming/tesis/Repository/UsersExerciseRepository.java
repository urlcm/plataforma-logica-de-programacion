package com.web_programming.tesis.Repository;

import com.web_programming.tesis.Models.Users;
import com.web_programming.tesis.Models.UsersExercise;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersExerciseRepository  extends JpaRepository<UsersExercise, Integer> {
    public List<UsersExercise> findByUser(Users user);
}
