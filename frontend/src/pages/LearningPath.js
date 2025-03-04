import React, { useState } from 'react';
import Quiz from '../components/Quiz';
import CodeEditor from '../components/CodeEditor';
import ProgressBar from '../components/ProgressBar';
import './../styles/LearningPath.css';

const LearningPath = () => {
  const [currentLesson, setCurrentLesson] = useState('Introduction to Python');

  const pythonLessons = [
    'Introduction to Python',
    'Setting Up Your Environment',
    'Python Basics',
    'Variables and Data Types',
    'Control Flow',
    'Functions in Python',
    'Working with Lists and Dictionaries',
    'Python Modules and Libraries',
    'File Handling in Python',
    'Introduction to Object-Oriented Programming (OOP)',
  ];

  const cPlusPlusLessons = [
    'Introduction to C++',
    'Setting Up Your Environment',
    'Hello World Program',
    'Variables and Data Types',
    'Control Flow',
    'Functions in C++',
    'Object-Oriented Programming (OOP) Basics',
    'Arrays and Pointers',
    'File Handling',
    'Advanced Topics and Best Practices',
    'Project Example',
  ];

  const javaLessons = [
    'Introduction to Java',
    'Setting Up Your Environment',
    'Java Basics',
    'Variables and Data Types',
    'Control Flow',
    'Object-Oriented Programming (OOP)',
    'Arrays in Java',
    'File Handling in Java',
  ];

  const lessons = {
    Python: pythonLessons,
    'C++': cPlusPlusLessons,
    Java: javaLessons,
  };

  const [selectedLanguage, setSelectedLanguage] = useState('Python');

  return (
    <div className="learning-path">
      <aside className="sidebar">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          <option value="Python">Python</option>
          <option value="C++">C++</option>
          <option value="Java">Java</option>
        </select>
        <ul>
          {lessons[selectedLanguage].map((lesson) => (
            <li key={lesson} onClick={() => setCurrentLesson(lesson)}>
              {lesson}
            </li>
          ))}
        </ul>
      </aside>
      <main className="content">
        <h1>{currentLesson}</h1>
        <ProgressBar progress={50} /> {/* Example progress */}
        <Quiz
          questions={[
            { question: 'What is Python?', options: [{ text: 'A snake', isCorrect: false }, { text: 'A programming language', isCorrect: true }] },
          ]}
          onComplete={(xp) => console.log(`Earned ${xp} XP`)}
        />
        <CodeEditor language={selectedLanguage.toLowerCase()} />
      </main>
    </div>
  );
};

export default LearningPath;