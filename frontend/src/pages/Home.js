import React from 'react';
import { Link } from 'react-router-dom';
import './../styles/Home.css';
import learning from './../assets/learning.svg';
import collabooration from './../assets/collaboration.svg';
import personal_skill from './../assets/personal_skill.svg';
import cpp_logo from './../assets/cpp_logo.png';
import java_logo from './../assets/java_logo.png';
import python_logo from './../assets/python.png';

const Home = () => {
  return (
    <div className="home">
      <header className="hero">
        <h1>ProgPlay Platform</h1>
        <h1>the Gamification Learning Platform</h1>
        <p>Level up your coding skills one quest at a time. Learn, practice, and play your way to becoming a programming pro!</p>
        <div className="buttons">
          <Link to="/login" className="btn login-btn">Log in</Link>
          <Link to="/signup" className="btn signup-btn">Start Now</Link>
        </div>
      </header>
      <section className="features">
        <div className='features-para'>
          <p>Current Available</p>
          <p>Programming Languages</p>
        </div>
        <div className="features-img"><img src={cpp_logo} alt='cpp'></img></div>
        <div className="features-img"><img src={java_logo} alt='java'></img></div>
        <div className="features-img"><img src={python_logo} alt='python'></img></div>
      </section>
      <section className="why-progplay">
        <h2>Why ProgPlay?</h2>
        <div className="cards">
          <div className="card">
            <img src={learning} alt="engaging img" className='why-img'/>
            <h3>Engaging Learning Experience</h3>
            <p>ProgPlay transforms coding education into an interactive learning process with quests, badges, and rewards.</p>
          </div>
          <div className="card">
          <img src={personal_skill} alt="personal img" className='why-img'/>
            <h3>Personalized Skill Development</h3>
            <p>Our platform adapts to individual coding levels with targeted exercises and feedback.</p>
          </div>
          <div className="card">
          <img src={collabooration} alt="collab img" className='why-img'/>
            <h3>Community and Support</h3>
            <p>Join a vibrant community of learners and get help from peers and mentors.</p>
          </div>
        </div>
        <Link to="/learning-path" className="code-btn">I want to code</Link>
      </section>

      <section className="languages-feature">
        <h2>Learn a language from ProgPlay</h2>
        <div className="languages">
          <div className="language-card">
            <img src={cpp_logo} alt="cpp img" className='language-img'/>
            <h3>C++</h3>
            <p>Unleash performance, master complexity.</p>
          </div>
          <div className="language-card">
          <img src={java_logo} alt="java img" className='language-img'/>
            <h3>Java</h3>
            <p>Write once, run anywhere, empower everything.</p>
          </div>
          <div className="language-card">
          <img src={python_logo} alt="python img" className='language-img'/>
            <h3>Python</h3>
            <p>Code with clarity, power in simplicity.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;