package com.web_programming.tesis.Services;

import com.web_programming.tesis.Models.Test;
import com.web_programming.tesis.Repository.TestRepository;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TestServices implements ITestRepository{

    @Autowired
    private TestRepository testRepository;
    @Override
    public List<Test> getTest() {
        return this.testRepository.findAll();
    }

    @Override
    public Test findTestById(Integer idTest) {
        return this.testRepository.findById(idTest).orElse(null);
    }

    @Override
    public Boolean saveTest(Test test) {
        try {
            this.testRepository.save(test);
            return true;
        }
        catch (Error e){
            return false;
        }
    }

    @Override
    public void DeleteTest(Integer idTest) {
        this.testRepository.deleteById(idTest);
    }
}
