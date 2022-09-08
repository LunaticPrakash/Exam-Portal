package com.lunatic.examportalbackend.services.implementation;

import com.lunatic.examportalbackend.models.Category;
import com.lunatic.examportalbackend.models.Quiz;
import com.lunatic.examportalbackend.repository.QuizRepository;
import com.lunatic.examportalbackend.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizServiceImpl implements QuizService {

    @Autowired
    public QuizRepository quizRepository;

    @Override
    public Quiz addQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public List<Quiz> getQuizzes() {
        return quizRepository.findAll();
    }

    @Override
    public Quiz getQuiz(Long quizId) {
        return quizRepository.findById(quizId).isPresent() ? quizRepository.findById(quizId).get() : null;
    }

    @Override
    public Quiz updateQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    @Override
    public void deleteQuiz(Long quizId) {
        quizRepository.deleteById(quizId);
    }

    @Override
    public List<Quiz> getQuizByCategory(Category category) {
        return quizRepository.findByCategory(category);
    }
}
