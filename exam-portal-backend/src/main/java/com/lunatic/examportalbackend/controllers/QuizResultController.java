package com.lunatic.examportalbackend.controllers;

import com.lunatic.examportalbackend.models.Question;
import com.lunatic.examportalbackend.models.Quiz;
import com.lunatic.examportalbackend.models.QuizResult;
import com.lunatic.examportalbackend.services.QuestionService;
import com.lunatic.examportalbackend.services.QuizResultService;
import com.lunatic.examportalbackend.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping("/api/quizResult")
public class QuizResultController {

    @Autowired
    private QuestionService questionService;
    @Autowired
    private QuizService quizService;

    @Autowired
    private QuizResultService quizResultService;

    @PostMapping(value = "/submit", params = {"userId", "quizId"})
    public ResponseEntity<?> submitQuiz(@RequestParam Long userId, @RequestParam Long quizId, @RequestBody HashMap<String,String> answers) {
        Quiz quiz = quizService.getQuiz(quizId);
        int totalMarks = quiz.getMaxMarks();
        int totalQuestions = quiz.getNumberOfQuestions();
        float marksPerQuestion = (float)totalMarks/totalQuestions;

        Question question = null;
        int numCorrectAnswers = 0;
        for(Map.Entry<String, String> m : answers.entrySet()){
            Long quesId = Long.valueOf(m.getKey());
            question = questionService.getQuestion(Long.valueOf(m.getKey()));
            if(question != null) {
                if(question.getAnswer().equals(m.getValue())){
                    numCorrectAnswers++;
                }
            }
        }
        float totalObtainedMarks = numCorrectAnswers*marksPerQuestion;

        QuizResult quizResult = new QuizResult();
        quizResult.setUserId(userId);
        quizResult.setQuiz(quizService.getQuiz(quizId));
        quizResult.setTotalObtainedMarks(totalObtainedMarks);
        final ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        quizResult.setAttemptDatetime(now.toLocalDate().toString() + " " + now.toLocalTime().toString().substring(0,8));

        quizResultService.addQuizResult(quizResult);
        return ResponseEntity.ok(quizResult);
    }

    @GetMapping(value = "/", params = "userId")
    public ResponseEntity<?> getQuizResults(@RequestParam Long userId){
        List<QuizResult> quizResultsList =  quizResultService.getQuizResultsByUser(userId);
        Collections.reverse(quizResultsList);
        return ResponseEntity.ok(quizResultsList);
    }
}
