package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Exercise;
import com.web_programming.tesis.Models.Users;

import java.util.List;
import java.util.Optional;

public interface IExerciseRepository {
    List<Exercise> getExercises();

    Exercise findExerciseById(Integer idExercise);

    void saveExercise(Exercise exercise);

    Exercise findByDescription(String description);
}
