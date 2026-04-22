package com.web_programming.tesis.Controller;

import com.web_programming.tesis.Models.Exercise;
import com.web_programming.tesis.Models.Users;
import com.web_programming.tesis.Models.UsersExercise;
import com.web_programming.tesis.Services.ExerciseServices;
import com.web_programming.tesis.Services.UsersExerciseServices;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("plataforma-programuat")
@CrossOrigin(value = "http://localhost:4200")
public class ExerciseController {
    private static final Logger logger = LoggerFactory.getLogger(ExerciseController.class);

    @Autowired
    private ExerciseServices exerciseServices;

    @Autowired
    private UsersExerciseServices usersExerciseServices;

    @PostMapping("/save-exercise")
    public Exercise saveExercise(@RequestBody Exercise exercise){
        //try {
            //logger.info("Ejercicio: "+ exercise);
            this.exerciseServices.saveExercise(exercise);;
            return exercise;
        //}
        /*catch (Error e){
            logger.info(String.valueOf(e));
            return false;
        }*/
    }

    @GetMapping("/get-exercises")
    public List<Exercise> findAllExercise(){
        return this.exerciseServices.getExercises();
    }

    @PostMapping("/save-user-exercise")
    public boolean saveExerciseUser(@RequestBody UsersExercise usersExercise){
        try{
            this.usersExerciseServices.saveUserExercise(usersExercise);
            return true;
        }
        catch (Error e){
            logger.info(e.getMessage());
            return false;
        }
    }

    //public Exercise
}
