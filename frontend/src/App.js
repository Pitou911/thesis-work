import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LearningPath from './pages/LearningPath';
import Leaderboard from './pages/Leaderboard';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile'; // Import the Profile component
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute'; 
import { AuthProvider } from './contexts/AuthContext'; // Import AuthProvider
import './styles/global.css';

function App() {
  return (
    <AuthProvider> {/* Wrap the app with AuthProvider */}
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/learning-path"
              element={
                <ProtectedRoute>
                  <LearningPath />
                </ProtectedRoute>
              }
            />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;