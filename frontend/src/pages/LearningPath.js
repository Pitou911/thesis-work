import React, { useState, useEffect } from 'react';
import Quiz from '../components/Quiz';
import ProgressBar from '../components/ProgressBar';
import './../styles/LearningPath.css';

const LearningPath = () => {
  const [currentLesson, setCurrentLesson] = useState(null); // Store the selected lesson object
  const [lessons, setLessons] = useState([]); // Store fetched lessons
  const [quizData, setQuizData] = useState([]); // Store quiz data for the selected lesson
  const [selectedLanguage, setSelectedLanguage] = useState('Python');

  // Map language names to valid grammar values
  const languageMap = {
    Python: 'python',
    'C++': 'cpp',
    Java: 'java',
  };

  // Fetch lessons when the selected language changes
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/lessons/${languageMap[selectedLanguage]}`);
        if (!response.ok) {
          throw new Error('Failed to fetch lessons');
        }
        const data = await response.json();
        setLessons(data); // Update the lessons state with fetched data
        if (data.length > 0) {
          setCurrentLesson(data[0]); // Set the first lesson as the default
          fetchQuizData(data[0].id); // Fetch quiz data for the first lesson
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, [selectedLanguage]); // Re-run when selectedLanguage changes

  // Fetch quiz data for the selected lesson
  const fetchQuizData = async (lessonId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/quizzes/${lessonId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch quiz data');
      }
      const data = await response.json();
      setQuizData(data); // Update the quizData state with fetched data
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  // Handle lesson selection
  const handleLessonClick = (lesson) => {
    setCurrentLesson(lesson); // Set the selected lesson
    fetchQuizData(lesson.id); // Fetch quiz data for the selected lesson
  };

  return (
    <div className="learning-path">
      <aside className="sidebar">
        <div className="custom-select">
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
          >
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
          </select>
        </div>
        <ul>
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              onClick={() => handleLessonClick(lesson)}
              className={currentLesson?.id === lesson.id ? 'active' : ''}
            >
              {lesson.title}
            </li>
          ))}
        </ul>
      </aside>
      <main className="content">
        {currentLesson ? (
          <>
            <ProgressBar progress={50} /> {/* Example progress */}
            <h1>{currentLesson.title}</h1>
            <p>{currentLesson.content}</p>
            {/* Pass the entire quizData array to the Quiz component */}
            <Quiz
              quizzes={quizData.map((quiz) => ({
                id: quiz.id,
                question: quiz.question,
                options: JSON.parse(quiz.options),
                correctAnswer: quiz.correctAnswer,
              }))}
              onComplete={(xp) => console.log(`Earned ${xp} XP`)}
            />
          </>
        ) : (
          <p>Select a lesson to get started.</p>
        )}
      </main>
    </div>
  );
};

export default LearningPath;