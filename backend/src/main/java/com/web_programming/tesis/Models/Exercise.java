package com.web_programming.tesis.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@ToString
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idExercise")
    Integer idExercise;
    @Column(columnDefinition = "TEXT")
    String description;
    // Relación Many-to-One con Difficulty
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_difficulty")
    @JsonBackReference
    private Difficulty difficulty;

    // Relación One-to-Many con UsersExercise
    @OneToMany(mappedBy = "exercise", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("exercise-users")
    private List<UsersExercise> usersExercises;
    //FOREIGN KEY (idDifficulty) REFERENCES difficulty(idDifficulty)
}

