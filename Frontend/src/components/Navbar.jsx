import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-dark border-bottom shadow-sm fixed-top mb-3">
        <div className="container">
          <Link className="navbar-brand fw-bold text-info" to="/">
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
                <Link className="nav-link  text-light" to="/about">
                  <i className="bi bi-info-circle me-1"></i>About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-outline-info" to="/login">
                  <i className="bi bi-box-arrow-in-right me-1"></i>Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="btn btn-info" to="/register">
                  <i className="bi bi-person-plus me-1"></i>Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
