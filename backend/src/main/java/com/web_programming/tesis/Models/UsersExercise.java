package com.web_programming.tesis.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@ToString
public class UsersExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_users_exercise")
    public Integer idUsersExercise;
    // Relación Many-to-One con User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_user", nullable = false)
    public Users user;

    // Relación Many-to-One con Exercise
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_exercise", nullable = false)
    @JsonBackReference("exercise-users")
    public Exercise exercise;

    @Column(columnDefinition = "TEXT")
    public String solution;
    public Integer countLikes;
    public LocalTime time;

    //FOREIGN KEY (idExercise) REFERENCES Exercise(idExercise),
    //FOREIGN KEY (idUser) REFERENCES Users(idUser)
}
