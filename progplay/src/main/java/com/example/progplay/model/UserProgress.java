package com.example.progplay.model;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "user_progress")
@Data
public class UserProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
    private boolean completed;
    private int xpEarned;
}