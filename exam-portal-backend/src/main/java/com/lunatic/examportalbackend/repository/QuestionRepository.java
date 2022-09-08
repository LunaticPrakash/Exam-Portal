package com.lunatic.examportalbackend.repository;

import com.lunatic.examportalbackend.models.Question;
import com.lunatic.examportalbackend.models.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuiz(Quiz quiz);
}
