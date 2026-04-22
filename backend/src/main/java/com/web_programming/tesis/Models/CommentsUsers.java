package com.web_programming.tesis.Models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@ToString
public class CommentsUsers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idCommentsUsers")
    private Integer idCommentsUsers;

    // Relación Many-to-One con User
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idUser", nullable = false)
    private Users user;

    // Relación Many-to-One con Comment
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "idComment", nullable = false)
    private Comments comment;
    //FOREIGN KEY (idUser) REFERENCES Users(idUser),
    //FOREIGN KEY (idComment) REFERENCES Comments(idComment)
}
