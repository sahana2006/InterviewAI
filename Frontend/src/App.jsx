import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import CandidateDashboard from "./Pages/Candidate_Dashboard.jsx";
import DomainQuizzes from "./Pages/Quiz/Domain_Quizzes.jsx";
import QuizAttemptPage from "./Pages/Quiz/QuizAttempt.jsx";
import DomainSelection from "./Pages/AI_Interview/DomainSelection.jsx";
import InterviewPage from "./Pages/AI_Interview/InterviewPage.jsx";
import InterviewResults from "./Pages/AI_Interview/InterviewResults.jsx";
import CodingTest from "./Pages/Coding_test/CodingTest.jsx";
import CodingDetail from "./Pages/Coding_test/CodingDetail.jsx";
import HRDashboard from "./Pages/HR_Dashboard.jsx";
import JobPostForm from "./Pages/HR-Section/PostJobVacancy.jsx";
import ResumeCoach from "./Pages/ResumeCoach.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
      <Route path="/domain-quizzes" element={<DomainQuizzes />} />
      <Route path="/quiz/:quizId/attempt/:attemptId" element={<QuizAttemptPage />} />
      <Route path="/ai-interview" element={<DomainSelection />} />
      <Route path="/interview/:session_id" element={<InterviewPage />} />
      <Route path="/interview/:session_id/results" element={<InterviewResults />} />
      <Route path="/coding-test" element={<CodingTest />} />
      <Route path="/coding-test/question/:questionId" element={<CodingDetail />} />
      <Route path="/hr-dashboard" element={< HRDashboard/>} />
      <Route path="/hr/post-job" element={< JobPostForm/>} />
      <Route path="/resume" element={< ResumeCoach/>} />
      {/* Add other routes as needed */}
    </Routes>
  );
}

export default App;
