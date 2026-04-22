package com.web_programming.tesis.Repository;

import com.web_programming.tesis.Models.Comments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentsRepository extends JpaRepository<Comments, Integer> {
}
