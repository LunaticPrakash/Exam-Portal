package com.lunatic.examportalbackend.repository;

import com.lunatic.examportalbackend.models.Category;
import com.lunatic.examportalbackend.models.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCategory(Category category);
}
