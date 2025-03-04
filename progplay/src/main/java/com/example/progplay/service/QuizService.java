package com.example.progplay.service;

import com.example.progplay.model.Quiz;
import com.example.progplay.model.User;
import com.example.progplay.model.UserProgress;
import com.example.progplay.repository.QuizRepository;
import com.example.progplay.repository.UserProgressRepository;
import com.example.progplay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private UserProgressRepository userProgressRepository;
    @Autowired
    private UserRepository userRepository;

    public List<Quiz> getQuizzesByLesson(Long lessonId) {
        return quizRepository.findByLessonId(lessonId);
    }

    public boolean submitQuizAnswer(Long userId, Long lessonId, Long quizId, String answer) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Check if the answer is correct
        boolean isCorrect = quiz.getCorrectAnswer().equals(answer);
        if (!isCorrect) {
            return false; // No XP awarded for wrong answer
        }

        // Check if the user has already completed this quiz
        UserProgress progress = userProgressRepository.findByUserIdAndLessonId(userId, lessonId);
        if (progress != null && progress.isCompleted()) {
            return true; // Quiz already completed, no additional XP
        }

        // Award XP and mark quiz as completed
        if (progress == null) {
            progress = new UserProgress();
            progress.setUser(user);
            progress.setLesson(quiz.getLesson());
        }
        progress.setCompleted(true);
        progress.setXpEarned(progress.getXpEarned() + 20); // 20 XP per correct quiz
        userProgressRepository.save(progress);

        // Update user's total XP
        user.setXp(user.getXp() + 20);
        userRepository.save(user);

        return true;
    }

    public int getUserXP(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getXp();
    }
}