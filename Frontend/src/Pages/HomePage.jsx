import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx"; // Assuming Navbar is in components folder
import { UserCheck, Cpu, Mic } from "lucide-react";

const HomePage = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-dark text-white py-5 text-center mt-5">
        <h1 className="display-5 fw-bold">IntervueAI</h1>
        <p className="lead">Your Smart AI-Powered Interview Assistant</p>
      </div>

      {/* Main Section */}
      <main className="container text-center py-5">
        <h2 className="text-dark fw-bold mb-3">Ace Every Interview with AI</h2>
        <p className="text-muted mb-4 fw-semibold">
          Practice interviews, get real-time feedback, and build confidence.
          From coding rounds to behavioral assessments — we've got you covered.
        </p>

        <Link to="/register">
          <button className="btn btn-outline-dark btn-lg mb-5">
            Get Started
          </button>
        </Link>

        {/* Feature Cards */}
        <div className="row g-4">
          <div className="col-md-4">
            <div className="card h-100 bg-secondary text-light border-0 shadow-sm">
              <div className="card-body">
                <Mic size={40} className="text-warning mb-2" />
                <h5 className="fw-bold">Dynamic Interviewing</h5>
                <p>
                  Adaptive questions based on your answers, with voice/text
                  support and instant feedback.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 bg-secondary text-light border-0 shadow-sm">
              <div className="card-body">
                <Cpu size={40} className="text-warning mb-2" />
                <h5 className="fw-bold">Technical Skill Assessment</h5>
                <p>
                  Solve coding problems in multiple languages with real-time
                  code analysis and scoring.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 bg-secondary text-light border-0 shadow-sm">
              <div className="card-body">
                <UserCheck size={40} className="text-warning mb-2" />
                <h5 className="fw-bold">HR & Personality Insights</h5>
                <p>
                  Analyze tone, clarity, and expression for HR readiness. Get
                  complete feedback reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-dark text-center text-light py-3 border-top small">
        © 2025 IntervueAI — Made with 💡 for confident candidates |
        <a
          href="https://github.com/yourusername/intervueai"
          className="ms-2 text-warning"
        >
          GitHub
        </a>
      </footer>
    </>
  );
};

export default HomePage;
