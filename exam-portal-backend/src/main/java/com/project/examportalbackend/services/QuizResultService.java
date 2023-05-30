package com.project.examportalbackend.services;

import com.project.examportalbackend.models.QuizResult;

import java.util.List;

public interface QuizResultService {
    QuizResult addQuizResult(QuizResult quizResult);
    List<QuizResult> getQuizResults();

    List<QuizResult> getQuizResultsByUser(Long userId);
}

