package com.example.progplay.repository;

import com.example.progplay.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    UserProgress findByUserIdAndLessonId(Long userId, Long lessonId);
}