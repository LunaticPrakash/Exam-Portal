package com.lunatic.examportalbackend.services;

import com.lunatic.examportalbackend.models.Category;
import com.lunatic.examportalbackend.models.Quiz;

import java.util.List;


public interface QuizService {

    Quiz addQuiz(Quiz quiz);

    List<Quiz> getQuizzes();

    Quiz getQuiz(Long quizId);

    Quiz updateQuiz(Quiz quiz);

    void deleteQuiz(Long quizId);

    // Extra methods
    List<Quiz> getQuizByCategory(Category category);
}
