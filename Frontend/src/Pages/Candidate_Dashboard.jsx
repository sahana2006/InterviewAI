import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

const CandidateDashboard = () => {
  const [activeTab, setActiveTab] = useState("availableJobs");

  const tabContent = {
    availableJobs: {
      title: "Available Jobs",
      icon: "bi-briefcase",
      link: "/available-jobs",
      desc: "Browse and apply for jobs suited to your skills.",
    },
    applications: {
      title: "My Applications",
      icon: "bi-file-earmark-text",
      link: "/my-applications",
      desc: "Track the status of your job applications.",
    },
    interviews: {
      title: "Interview Schedule",
      icon: "bi-calendar-event",
      link: "/interview-schedule",
      desc: "Check your upcoming interviews and timings.",
    },
    chat: {
      title: "Chat with HR",
      icon: "bi-chat-dots",
      link: "/chat",
      desc: "Get in touch with HR for discussions or queries.",
    },
    documents: {
      title: "Upload Documents",
      icon: "bi-upload",
      link: "/upload-documents",
      desc: "Upload resume, certificates, and other documents.",
    },
    resume: {
      title: "Resume Coach",
      icon: "bi bi-paperclip",
      link: "/resume",
      desc: "Upload resume and get feeedback using Agentic AI",
    },
    quizzes: {
      title: "Domain Quizzes",
      icon: "bi-patch-check",
      link: "/domain-quizzes",
      desc: "Take quizzes based on your selected job domain.",
    },
    aiInterview: {
      title: "AI Interview",
      icon: "bi-cpu",
      link: "/ai-interview",
      desc: "Practice interviews using AI-based simulations.",
    },
    codingTest: {
      title: "Coding Test",
      icon: "bi-question-circle",
      link: "/coding-test",
      desc: "Solve real coding problems to test your skills.",
    },
    results: {
      title: "Results",
      icon: "bi-bar-chart-line",
      link: "/results",
      desc: "View scores from tests, quizzes and interviews.",
    },
  };

  return (
    <>
      <Nav />
      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Sidebar */}
          <div className="col-md-3 bg-dark text-white py-4 shadow mt-3">
            <h4 className="text-center mb-4">🎓 Candidate Dashboard</h4>
            <ul className="nav flex-column">
              {Object.keys(tabContent).map((key) => (
                <li className="nav-item mb-2 mt-2" key={key}>
                  <button
                    className={`btn w-100 text-start ${
                      activeTab === key
                        ? "btn-secondary text-info fw-bold"
                        : "btn-outline-info fw-bold"
                    }`}
                    onClick={() => setActiveTab(key)}
                  >
                    <i className={`bi ${tabContent[key].icon} me-2`}></i>
                    {tabContent[key].title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-9 bg-secondary d-flex align-items-center justify-content-center p-5">
            <div className="card text-center shadow-lg border-0 w-75 bg-dark text-white">
              <div className="card-body">
                <div className="mb-3">
                  <i
                    className={`bi ${tabContent[activeTab].icon} text-info`}
                    style={{ fontSize: "3rem" }}
                  ></i>
                </div>
                <h3 className="card-title">{tabContent[activeTab].title}</h3>
                <p className="card-text text-white">
                  {tabContent[activeTab].desc}
                </p>
                <Link to={tabContent[activeTab].link}>
                  <button className="btn btn-outline-info">
                    Open {tabContent[activeTab].title}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateDashboard;
