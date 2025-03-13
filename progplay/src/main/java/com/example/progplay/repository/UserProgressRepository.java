package com.example.progplay.repository;

import com.example.progplay.model.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    UserProgress findByUserIdAndLessonId(Long userId, Long lessonId);

    List<UserProgress> findByUserIdAndLessonIdIn(Long userId, List<Long> lessonIds);
    List<UserProgress> findByUserId(Long userId);
}