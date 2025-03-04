package com.example.progplay.controller;

import com.example.progplay.model.Quiz;
import com.example.progplay.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @GetMapping("/{lessonId}")
    public List<Quiz> getQuizzes(@PathVariable Long lessonId) {
        return quizService.getQuizzesByLesson(lessonId);
    }

    @PostMapping("/submit")
    public boolean submitAnswer(@RequestParam Long userId, @RequestParam Long lessonId, 
                                @RequestParam Long quizId, @RequestParam String answer) {
        return quizService.submitQuizAnswer(userId, lessonId, quizId, answer);
    }

    @GetMapping("/xp/{userId}")
    public int getUserXP(@PathVariable Long userId) {
        return quizService.getUserXP(userId);
    }
}