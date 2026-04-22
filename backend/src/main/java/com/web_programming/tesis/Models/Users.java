package com.web_programming.tesis.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idUser")
    private Integer idUser;
    private String nameUser;
    private String lastname;
    private String email ;
    private String password;
    private Integer level ;
    private Integer exp;

    // Relación Many-to-One con Rol
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idRol", nullable = true)
    //@JsonManagedReference
    @JsonIgnore
    private Rol rol;

    // Relación One-to-Many con UsersExercise
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<UsersExercise> usersExercises;

    // Relación One-to-Many con Comments
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comments> comments;

    // Relación One-to-Many con CommentsUsers
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CommentsUsers> commentsUsers;

    @OneToOne(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Test test;
    //FOREIGN KEY (idRol) REFERENCES Rol(idRol)


    /*
    * 🔹 Cómo decidirlo
1️⃣ Padre

Es el propietario lógico de la relación.

Normalmente es el lado que tiene sentido principal en tu modelo de negocio o el que quieres que aparezca en el JSON.

En JPA, también suele ser el lado que no tiene mappedBy, es decir, el que define la columna de la FK.

2️⃣ Hijo

Es el lado dependiente o secundario de la relación.

En JPA, suele ser el lado que tiene mappedBy y no tiene la FK propia.

Se marca con @JsonBackReference para no serializarlo y evitar la recursión
    *
    * */
}
