package com.example.progplay.model;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Table(name = "lessons")
@Data
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String content;
    @Enumerated(EnumType.STRING)
    private Language language;

    public enum Language {
        CPP, PYTHON, JAVA
    }
}