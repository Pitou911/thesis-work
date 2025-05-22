package com.example.progplay.controller;

import com.example.progplay.model.Lesson;
import com.example.progplay.model.Lesson.Language; // Import the enum
import com.example.progplay.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lessons")
public class LessonController {
    @Autowired
    private LessonRepository lessonRepository;

    @GetMapping
    public List<Lesson> getAllLessons() {
        return lessonRepository.findAll();
    }
    @GetMapping("/language/{language}")
    public List<Lesson> getLessonsByLanguage(@PathVariable String language) {
        // Convert the string to the Language enum
        Lesson.Language lang = Lesson.Language.valueOf(language.toUpperCase());
        return lessonRepository.findByLanguage(lang);
    }
}