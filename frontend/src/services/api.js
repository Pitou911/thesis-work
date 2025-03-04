import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Adjust to your Spring Boot backend URL

export const api = {
  // Login endpoint
  login: (credentials) => axios.post(`${API_BASE_URL}/users/login`, credentials, {
    headers: {
      'Content-Type': 'application/json', // Ensure the content type is set to JSON
    },
  }),

  // Register endpoint
  register: (userData) => axios.post(`${API_BASE_URL}/users/register`, userData, {
    headers: {
      'Content-Type': 'application/json', // Ensure the content type is set to JSON
    },
  }),

  // Get all users endpoint
  getUsers: () => axios.get(`${API_BASE_URL}/users`),

  // Get lessons by language endpoint
  getLessons: (language) => axios.get(`${API_BASE_URL}/lessons/${language}`),

  // Submit quiz answers endpoint
  submitQuiz: (answers) => axios.post(`${API_BASE_URL}/quiz/submit`, answers, {
    headers: {
      'Content-Type': 'application/json', // Ensure the content type is set to JSON
    },
  }),

  // Add more endpoints as needed
};