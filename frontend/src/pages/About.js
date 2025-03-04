import React from "react";
import "./../styles/About.css"; // Import the CSS file
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p className="about-description">
        Welcome to our interactive web application designed to make learning beginner programming languages like <strong>C++</strong> and <strong>Python</strong> engaging, effective, and fun! Inspired by leading platforms such as SoloLearn and Codecademy, our project aims to revolutionize how beginners approach coding by combining structured lessons, interactive quizzes, and hands-on coding challenges with gamification elements like leaderboards and achievement badges.
      </p>

      <h2>What Sets Us Apart</h2>
      <ul className="features-list">
        <li>
          <strong>Engaging Learning Paths:</strong> Our platform offers a structured curriculum for C++ and Python, ensuring learners progress logically from basic concepts to more advanced topics.
        </li>
        <li>
          <strong>Interactive Challenges:</strong> Practice coding in real-time with our integrated coding sandbox, complete with instant feedback to help you learn by doing.
        </li>
        <li>
          <strong>Gamification:</strong> Earn badges, climb leaderboards, and track your progress as you complete lessons and challenges, making learning feel like a rewarding game.
        </li>
        <li>
          <strong>User-Centric Design:</strong> We’ve prioritized simplicity and usability, ensuring that even those new to programming can navigate the platform with ease.
        </li>
        <li>
          <strong>Scalable and Future-Ready:</strong> Built with flexibility in mind, our platform is designed to accommodate additional programming languages and features in the future.
        </li>
      </ul>

      <h2>Our Vision</h2>
      <p className="vision-text">
        We believe that learning to code should be accessible, interactive, and enjoyable for everyone. By combining educational best practices with cutting-edge technology, we aim to empower beginners to build a strong foundation in programming and inspire them to pursue further learning.
      </p>

      <div className="cta-section">
        <p>Join us on this exciting journey as we redefine how programming is taught and learned. Whether you're here to start your coding adventure or to enhance your skills, we’re here to support you every step of the way.</p>
        <Link to='/signup' className="btn signup-btn" id="getstarted">Get Started</Link>
      </div>
    </div>
  );
}

export default About;