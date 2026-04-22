package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Test;

import java.util.List;
import java.util.Optional;

public interface ITestRepository {
    List<Test> getTest();

    Test findTestById(Integer idTest);

    Boolean saveTest(Test test);

    void DeleteTest(Integer idTest);
}
