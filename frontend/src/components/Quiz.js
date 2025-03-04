import React, { useState } from 'react';
import './../styles/Quiz.css';

const Quiz = ({ quizzes, onComplete }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleAnswerClick = (selectedAnswer) => {
    const currentQuiz = quizzes[currentQuizIndex];
    if (selectedAnswer === currentQuiz.correctAnswer) {
      setScore(score + 1);
      setFeedback('Correct! 🎉');
      setTimeout(() => {
        setFeedback('');
        if (currentQuizIndex < quizzes.length - 1) {
          setCurrentQuizIndex(currentQuizIndex + 1);
        } else {
          onComplete(score + 1);
        }
      }, 1000);
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