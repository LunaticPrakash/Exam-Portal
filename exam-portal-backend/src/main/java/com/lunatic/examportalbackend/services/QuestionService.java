package com.lunatic.examportalbackend.services;

import com.lunatic.examportalbackend.models.Question;
import com.lunatic.examportalbackend.models.Quiz;

import java.util.List;

public interface QuestionService {

    Question addQuestion(Question question);

    List<Question> getQuestions();

    Question getQuestion(Long quesId);

    Question updateQuestion(Question question);

    void deleteQuestion(Long questionId);

    //Extra Methods
    List<Question> getQuestionsByQuiz(Quiz quiz);

}
