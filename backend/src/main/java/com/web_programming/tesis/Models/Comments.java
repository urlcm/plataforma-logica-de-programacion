package com.web_programming.tesis.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@ToString
public class Comments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idComment")
    private Integer idComment;

    @Column(name = "comment", nullable = false, length = 50)
    private String comment;

    @Column(name = "likes", nullable = false)
    private Integer likes;

    // Relación Many-to-One con User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUser", nullable = false)
    private Users user;

    // Relación One-to-Many con CommentsUsers
    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CommentsUsers> commentsUsers;

    //FOREIGN KEY (idUser) REFERENCES Users(idUser)
}
