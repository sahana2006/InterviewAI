import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient"; // 👈 import the client
import Navbar from "../components/Navbar";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "candidate",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
      const res = await apiClient.post("/accounts/register/", formData); // ✅ Uses apiClient
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        if (res.status === 201) {
            navigate("/login");
        }
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 mt-5">
        <h2 className="text-center mb-4 text-dark mb-4">Create an Account</h2>
        <div className="row justify-content-center">
          {success && <div className="alert alert-success">{success}</div>}
          <form
            onSubmit={handleSubmit}
            className="border p-4 rounded shadow-sm bg-light"
            style={{ width: "100%" }}
          >
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-12">
                <label className="form-label">Register as</label>
                <select
                  className="form-select"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="candidate">Candidate</option>
                  <option value="hr">HR</option>
                </select>
              </div>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn btn-dark w-100 mt-4">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
