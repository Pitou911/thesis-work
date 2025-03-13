import React, { useState, useEffect } from 'react';
import './../styles/Quiz.css';

const Quiz = ({ quizzes, onComplete }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  // Reset state when quizzes prop changes
  useEffect(() => {
    setCurrentQuizIndex(0);
    setScore(0);
    setFeedback('');
  }, [quizzes]);

  const handleAnswerClick = (selectedAnswer) => {
    const currentQuiz = quizzes[currentQuizIndex];
    if (selectedAnswer === currentQuiz.correctAnswer) {
      const newScore = score + 10;
      setScore(newScore);
      setFeedback('Correct! 🎉');

      if (currentQuizIndex < quizzes.length - 1) {
        // Move to the next question
        setCurrentQuizIndex(currentQuizIndex + 1);
        setFeedback(''); // Clear feedback immediately for the next question
      } else {
        // All questions completed successfully
        onComplete(newScore); // Pass the total score as XP
      }
    } else {
      setFeedback('Incorrect. Try again! ❌');
    }
  };

  return (
    <div className="quiz">
      <h2>Quiz</h2>
      {quizzes.length > 0 ? (
        <>
          <p>{quizzes[currentQuizIndex].question}</p>
          <ul>
            {quizzes[currentQuizIndex].options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleAnswerClick(option)}>
                  {option}
                </button>
              </li>
            ))}
          </ul>
          {feedback && <p className="feedback">{feedback}</p>}
          <p>
            Question {currentQuizIndex + 1} of {quizzes.length}
          </p>
        </>
      ) : (
        <p>No quiz available for this lesson.</p>
      )}
    </div>
  );
};

export default Quiz;