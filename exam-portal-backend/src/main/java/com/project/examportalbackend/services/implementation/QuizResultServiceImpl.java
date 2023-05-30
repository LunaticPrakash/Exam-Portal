package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.models.QuizResult;
import com.project.examportalbackend.repository.QuizResultRepository;
import com.project.examportalbackend.services.QuizResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizResultServiceImpl implements QuizResultService {

    @Autowired
    private QuizResultRepository quizResultRepository;

    @Override
    public QuizResult addQuizResult(QuizResult quizResult) {
        return quizResultRepository.save(quizResult);
    }

    @Override
    public List<QuizResult> getQuizResults() {
        return quizResultRepository.findAll();
    }

    @Override
    public List<QuizResult> getQuizResultsByUser(Long userId) {
        return quizResultRepository.findByUserId(userId);
    }
}
