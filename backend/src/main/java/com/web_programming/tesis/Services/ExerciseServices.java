package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Exercise;
import com.web_programming.tesis.Repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExerciseServices implements IExerciseRepository{
    @Autowired
    private ExerciseRepository exerciseRepository;

    @Override
    public List<Exercise> getExercises() {
        return this.exerciseRepository.findAll();
    }

    @Override
    public Exercise findExerciseById(Integer idExercise) {
        return this.exerciseRepository.findById(idExercise).orElse(null);
    }

    @Override
    public void saveExercise(Exercise exercise) {
        this.exerciseRepository.save(exercise);
    }

    @Override
    public Exercise findByDescription(String description) {
        return this.exerciseRepository.findByDescription(description);
    }
}
