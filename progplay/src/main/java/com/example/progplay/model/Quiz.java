package com.example.progplay.model;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "quizzes")
@Data
public class Quiz {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;
    private String question;
    private String correctAnswer;
    @Column(columnDefinition = "JSON")
    private String options;
}