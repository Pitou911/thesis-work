package com.example.progplay.service;

import com.example.progplay.model.Lesson;
import com.example.progplay.model.User;
import com.example.progplay.model.UserProgress;
import com.example.progplay.repository.LessonRepository;
import com.example.progplay.repository.UserProgressRepository;
import com.example.progplay.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserProgressService {

    @Autowired
    private UserProgressRepository userProgressRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LessonRepository lessonRepository;

    // Fetch user progress for a specific language
    public List<UserProgress> getUserProgressByLanguage(Long userId, String language) {
        List<Lesson> lessons = lessonRepository.findByLanguage(Lesson.Language.valueOf(language.toUpperCase()));
        List<Long> lessonIds = lessons.stream().map(Lesson::getId).collect(Collectors.toList());
        return userProgressRepository.findByUserIdAndLessonIdIn(userId, lessonIds);
    }

    // Helper method to get progress for a specific lesson
    public UserProgress getUserProgress(Long userId, Long lessonId) {
        return userProgressRepository.findByUserIdAndLessonId(userId, lessonId);
    }

    // Update user progress and XP
    public UserProgress updateUserProgress(UserProgress userProgress) {
        Long userId = userProgress.getUser().getId();
        Long lessonId = userProgress.getLesson().getId();
        System.out.println("Updating progress: userId=" + userId + ", lessonId=" + lessonId + 
                          ", xpEarned=" + userProgress.getXpEarned() + ", completed=" + userProgress.isCompleted());

        UserProgress existingProgress = userProgressRepository.findByUserIdAndLessonId(userId, lessonId);
        System.out.println("Existing progress: " + (existingProgress != null ? existingProgress : "none"));

        if (existingProgress != null) {
            // Update existing progress
            existingProgress.setCompleted(userProgress.isCompleted());
            existingProgress.setXpEarned(userProgress.getXpEarned());
            UserProgress saved = userProgressRepository.save(existingProgress);
            System.out.println("Updated existing progress: " + saved);
            updateUserTotalXp(userId); // Update total XP after saving progress
            return saved;
        } else {
            // Create new progress entry
            UserProgress saved = userProgressRepository.save(userProgress);
            System.out.println("Created new progress: " + saved);
            updateUserTotalXp(userId); // Update total XP after saving progress
            return saved;
        }
    }

    // Update the user's total XP based on all progress entries
    private void updateUserTotalXp(Long userId) {
        List<UserProgress> progressList = userProgressRepository.findByUserId(userId);
        System.out.println("Progress entries for userId=" + userId + ": " + progressList.size());
        progressList.forEach(p -> System.out.println(" - lessonId=" + p.getLesson().getId() + 
                                                    ", xpEarned=" + p.getXpEarned() + 
                                                    ", completed=" + p.isCompleted()));

        int totalXp = progressList.stream()
            .mapToInt(UserProgress::getXpEarned)
            .sum();
        System.out.println("Calculated total XP for userId=" + userId + ": " + totalXp);

        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
        user.setXp(totalXp);
        User savedUser = userRepository.save(user);
        System.out.println("Saved user XP: " + savedUser.getXp());
    }
}