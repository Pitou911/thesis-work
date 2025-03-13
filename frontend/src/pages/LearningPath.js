import React, { useState, useEffect } from 'react';
import Quiz from '../components/Quiz';
import ProgressBar from '../components/ProgressBar';
import './../styles/LearningPath.css';
import { useAuth } from '../contexts/AuthContext';

const LearningPath = () => {
  const { user } = useAuth();
  const [currentLesson, setCurrentLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('Python');
  const [userProgress, setUserProgress] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [totalXp, setTotalXp] = useState(0);

  const userId = user.id;

  const languageMap = {
    Python: 'PYTHON',
    'C++': 'CPP',
    Java: 'JAVA',
  };

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/lessons/language/${languageMap[selectedLanguage]}`);
        if (!response.ok) throw new Error('Failed to fetch lessons');
        const data = await response.json();
        setLessons(data);
        if (data.length > 0) {
          setCurrentLesson(data[0]);
          setCurrentLessonIndex(0);
          await fetchQuizData(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };
    fetchLessons();
  }, [selectedLanguage]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/user_progress/${userId}/${languageMap[selectedLanguage]}`);
        if (!response.ok) throw new Error('Failed to fetch user progress');
        const data = await response.json();
        setUserProgress(data);
        const totalLessons = lessons.length;
        const completedLessons = data.filter(progress => progress.completed).length;
        const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
        setProgressPercentage(percentage);

        const userResponse = await fetch(`http://localhost:8080/api/users/${userId}`);
        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setTotalXp(userData.xp);
      } catch (error) {
        console.error('Error fetching user progress:', error);
      }
    };
    if (lessons.length > 0) fetchUserProgress();
  }, [lessons, selectedLanguage]);

  const fetchQuizData = async (lessonId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/quizzes/${lessonId}`);
      if (!response.ok) throw new Error('Failed to fetch quiz data');
      const data = await response.json();
      setQuizData(data);
      return data;
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      return [];
    }
  };

  const isLessonLocked = (index) => {
    if (index === 0) return false;
    const previousLessonProgress = userProgress.find(p => p.lesson.id === lessons[index - 1].id);
    return !previousLessonProgress || !previousLessonProgress.completed;
  };

  const handleLessonClick = (lesson, index) => {
    if (!isLessonLocked(index)) {
      setCurrentLesson(lesson);
      fetchQuizData(lesson.id);
      setCurrentLessonIndex(index);
    }
  };

  const handleNextLesson = async () => {
    if (currentLessonIndex < lessons.length - 1) {
      const nextLessonIndex = currentLessonIndex + 1;
      const nextLesson = lessons[nextLessonIndex];

      const updatedProgressResponse = await fetch(`http://localhost:8080/api/user_progress/${userId}/${languageMap[selectedLanguage]}`);
      if (!updatedProgressResponse.ok) throw new Error('Failed to fetch updated user progress');
      const updatedProgress = await updatedProgressResponse.json();
      setUserProgress(updatedProgress);

      if (!isLessonLocked(nextLessonIndex)) {
        setCurrentLessonIndex(nextLessonIndex);
        setCurrentLesson(nextLesson);
        await fetchQuizData(nextLesson.id);
      } else {
        console.log('Next lesson is still locked:', nextLesson.title);
      }
    }
  };

  const handleQuizComplete = async (xp) => {
    try {
      const payload = {
        user: { id: userId },
        lesson: { id: currentLesson.id },
        xpEarned: xp,
        completed: true,
      };
      const response = await fetch('http://localhost:8080/api/user_progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Failed to update user progress: ${await response.text()}`);

      const updatedProgressResponse = await fetch(`http://localhost:8080/api/user_progress/${userId}/${languageMap[selectedLanguage]}`);
      if (!updatedProgressResponse.ok) throw new Error('Failed to fetch updated user progress');
      const updatedProgress = await updatedProgressResponse.json();
      setUserProgress(updatedProgress);

      const totalLessons = lessons.length;
      const completedLessons = updatedProgress.filter(progress => progress.completed).length;
      const percentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
      setProgressPercentage(percentage);

      const userResponse = await fetch(`http://localhost:8080/api/users/${userId}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();
      setTotalXp(userData.xp);

      // Dispatch custom event to notify other components (e.g., Nav.js)
      if (xp > 0) {
        window.dispatchEvent(new Event('xpUpdated'));
        console.log('Quiz completed with XP:', xp, 'Moving to next lesson...');
        await handleNextLesson();
      }
    } catch (error) {
      console.error('Error updating user progress:', error);
    }
  };

  return (
    <div className="learning-path">
      <aside className="sidebar">
        <div className="custom-select">
          <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
            <option value="Python">Python</option>
            <option value="C++">C++</option>
            <option value="Java">Java</option>
          </select>
        </div>
        <ul>
          {lessons.map((lesson, index) => (
            <li
              key={lesson.id}
              onClick={() => handleLessonClick(lesson, index)}
              className={`${currentLesson?.id === lesson.id ? 'active' : ''} ${isLessonLocked(index) ? 'locked' : ''}`}
              style={{ cursor: isLessonLocked(index) ? 'not-allowed' : 'pointer' }}
            >
              {lesson.title} {isLessonLocked(index) && '🔒'}
            </li>
          ))}
        </ul>
      </aside>
      <main className="content">
        {currentLesson ? (
          <>
            <ProgressBar progress={progressPercentage.toFixed(1)} />
            <p>Total XP: {totalXp}</p>
            <h1>{currentLesson.title}</h1>
            <p>{currentLesson.content}</p>
            <Quiz
              quizzes={quizData.map((quiz) => ({
                id: quiz.id,
                question: quiz.question,
                options: JSON.parse(quiz.options),
                correctAnswer: quiz.correctAnswer,
              }))}
              onComplete={handleQuizComplete}
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