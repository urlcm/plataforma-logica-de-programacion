package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Comments;
import com.web_programming.tesis.Repository.CommentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentsServices implements ICommentsRepository{
    @Autowired
    private CommentsRepository commentsRepository;


    @Override
    public List<Comments> getComment() {
        return commentsRepository.findAll();
    }

    @Override
    public Comments findCommentById(Integer idComment) {
        return this.commentsRepository.findById(idComment).orElse(null);
    }

    @Override
    public void saveComment(Comments comments) {
        this.commentsRepository.save(comments);
    }

    @Override
    public void deleteComment(Integer id) {
        this.commentsRepository.deleteById(id);
    }
}
