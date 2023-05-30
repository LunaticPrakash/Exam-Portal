package com.project.examportalbackend.services.implementation;

import com.project.examportalbackend.models.Question;
import com.project.examportalbackend.models.Quiz;
import com.project.examportalbackend.repository.QuestionRepository;
import com.project.examportalbackend.repository.QuizRepository;
import com.project.examportalbackend.services.QuestionService;
import com.project.examportalbackend.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    QuizRepository quizRepository;

    @Override
    public Question addQuestion(Question question) {
        Quiz quiz = quizRepository.findById(question.getQuiz().getQuizId()).get();
        quiz.setNumOfQuestions(quiz.getNumOfQuestions() + 1);
        quizRepository.save(quiz);
        return questionRepository.save(question);
    }

    @Override
    public List<Question> getQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Question getQuestion(Long quesId) {
        return questionRepository.findById(quesId).isPresent() ? questionRepository.findById(quesId).get() : null;
    }

    @Override
    public Question updateQuestion(Question question) {
        return questionRepository.save(question);
    }

    @Override
    public void deleteQuestion(Long questionId) {
        questionRepository.delete(getQuestion(questionId));
    }

    @Override
    public List<Question> getQuestionsByQuiz(Quiz quiz) {
        return questionRepository.findByQuiz(quiz);
    }
}
