import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../components/LogoutModal"; // ✅ Correct path

function Navbar() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    // optionally clear user info
    localStorage.removeItem("user");
    setShowModal(false);
    // redirect to login page
    navigate("/login");
  };
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-dark border-bottom shadow-sm fixed-top">
        <div className="container">
          <Link
            className="navbar-brand fw-bold text-info"
            to="/candidate-dashboard"
          >
            <i className="bi bi-chat-dots-fill me-2"></i>
            INTERVIEW AI
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav me-3 align-items-center gap-2">
              <li className="nav-item">
                <button
                  className="btn btn-outline-info"
                  onClick={() => setShowModal(true)}
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <LogoutModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}

export default Navbar;
