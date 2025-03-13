package com.example.progplay.controller;

import com.example.progplay.model.UserProgress;
import com.example.progplay.service.UserProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user_progress")
public class UserProgressController {

    @Autowired
    private UserProgressService userProgressService;

    @GetMapping("/{userId}/{language}")
    public List<UserProgress> getUserProgressByLanguage(
            @PathVariable Long userId,
            @PathVariable String language) {
        return userProgressService.getUserProgressByLanguage(userId, language);
    }

    @PostMapping
    public ResponseEntity<UserProgress> updateUserProgress(@RequestBody UserProgress userProgress) {
        UserProgress existingProgress = userProgressService.getUserProgress(userProgress.getUser().getId(), userProgress.getLesson().getId());
        if (existingProgress != null) {
            existingProgress.setXpEarned(userProgress.getXpEarned());
            existingProgress.setCompleted(userProgress.isCompleted());
            UserProgress updatedProgress = userProgressService.updateUserProgress(existingProgress);
            return ResponseEntity.ok(updatedProgress);
        } else {
            UserProgress newProgress = userProgressService.updateUserProgress(userProgress);
            return ResponseEntity.ok(newProgress);
        }
    }
}