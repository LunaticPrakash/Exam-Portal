package com.project.examportalbackend.controllers;

import com.project.examportalbackend.models.Category;
import com.project.examportalbackend.models.Quiz;
import com.project.examportalbackend.services.CategoryService;
import com.project.examportalbackend.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<?> addQuiz(@RequestBody Quiz quiz) {
        return ResponseEntity.ok(quizService.addQuiz(quiz));
    }

    @GetMapping("/")
    public ResponseEntity<?> getQuizzes() {
        return ResponseEntity.ok(quizService.getQuizzes());
    }

    @GetMapping("/{quizId}")
    public ResponseEntity<?> getQuiz(@PathVariable Long quizId) {
        return ResponseEntity.ok(quizService.getQuiz(quizId));
    }

    @GetMapping(value = "/", params = "catId")
    public ResponseEntity<?> getQuizByCategory(@RequestParam Long catId) {
        Category category = categoryService.getCategory(catId);
        return ResponseEntity.ok(quizService.getQuizByCategory(category));
    }

    @PutMapping("/{quizId}")
    public ResponseEntity<?> updateQuiz(@PathVariable Long quizId, @RequestBody Quiz quiz) {
        if (quizService.getQuiz(quizId) != null) {
            return ResponseEntity.ok(quizService.updateQuiz(quiz));
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Quiz with id : " + String.valueOf(quizId) + ", doesn't exists");
    }

    @DeleteMapping("/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable Long quizId) {
        quizService.deleteQuiz(quizId);
        return ResponseEntity.ok(true);
    }
}
