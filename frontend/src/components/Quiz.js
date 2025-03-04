import React, { useState } from 'react';
import './../styles/Quiz.css';

const Quiz = ({ questions, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 20); // 20 XP per correct answer
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(score + (isCorrect ? 20 : 0));
    }
  };

  return (
    <div className="quiz">
      <h2>{questions[currentQuestion]?.question}</h2>
      {questions[currentQuestion]?.options.map((option, index) => (
        <button key={index} onClick={() => handleAnswer(option.isCorrect)}>
          {option.text}
        </button>
      ))}
    </div>
  );
};

export default Quiz;