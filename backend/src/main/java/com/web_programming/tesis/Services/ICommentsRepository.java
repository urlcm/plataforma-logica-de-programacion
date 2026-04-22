package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Comments;

import java.util.List;

public interface ICommentsRepository {

    List<Comments> getComment();

    Comments findCommentById(Integer idComment);

    void saveComment(Comments comments);

    void deleteComment(Integer id);

}
