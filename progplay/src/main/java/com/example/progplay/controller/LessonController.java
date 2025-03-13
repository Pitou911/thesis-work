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

    // @GetMapping("/{id}")
    // public Lesson getLesson(@PathVariable Long id) {
    //     return lessonRepository.findById(id).orElseThrow(() -> new RuntimeException("Lesson not found"));
    // }

    // @GetMapping("/cpp")
    // public List<Lesson> getCppLessons() {
    //     return lessonRepository.findByLanguage(Language.CPP);
    // }

    // @GetMapping("/java")
    // public List<Lesson> getJavaLessons() {
    //     return lessonRepository.findByLanguage(Language.JAVA);
    // }

    // @GetMapping("/python")
    // public List<Lesson> getPythonLessons() {
    //     return lessonRepository.findByLanguage(Language.PYTHON);
    // }
    @GetMapping("/language/{language}")
    public List<Lesson> getLessonsByLanguage(@PathVariable String language) {
        // Convert the string to the Language enum
        Lesson.Language lang = Lesson.Language.valueOf(language.toUpperCase());
        return lessonRepository.findByLanguage(lang);
    }
}