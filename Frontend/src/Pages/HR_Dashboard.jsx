import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav_HR from "../components/Nav_HR";
import { Link } from "react-router-dom";

const HRDashboard = () => {
  const [activeTab, setActiveTab] = useState("postJobs");

  const tabContent = {
    postJobs: {
      title: "Post Job Vacancy",
      icon: "bi-plus-square",
      link: "/hr/post-job",
      desc: "Create and manage job postings for candidates.",
    },
    viewApplications: {
      title: "View Applications",
      icon: "bi-file-person",
      link: "/hr/view-applications",
      desc: "Review candidate applications with resumes.",
    },
    scheduleInterviews: {
      title: "Schedule Interviews",
      icon: "bi-calendar-check",
      link: "/hr/schedule-interview",
      desc: "Plan interviews with selected candidates.",
    },
    chatWithCandidates: {
      title: "Chat with Candidates",
      icon: "bi-chat-left-text",
      link: "/hr/chat",
      desc: "Discuss or clarify with applicants in real time.",
    },
    interviewCalendar: {
      title: "Interview Calendar",
      icon: "bi-calendar-event",
      link: "/hr/interview-calendar",
      desc: "See all upcoming interviews in one place.",
    },
  };

  return (
    <>
      <Nav_HR />
      <div className="container-fluid">
        <div className="row min-vh-100">
          {/* Sidebar */}
          <div className="col-md-3 bg-dark text-white py-4 shadow mt-3">
            <h4 className="text-center mb-4">💼 HR Dashboard</h4>
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

export default HRDashboard;
