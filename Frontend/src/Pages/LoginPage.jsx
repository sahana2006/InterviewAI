import React, { useState } from "react";
import apiClient from "../api/apiClient"; // your axios instance
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    console.log("Form Data:", formData);
    try {
      // 1. Get access and refresh tokens
      const res = await apiClient.post("/api/token/", formData);
      const { access, refresh } = res.data;
      console.log("Access Token:", access);
      console.log("Refresh Token:", refresh);
      // 2. Store tokens
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // 3. Fetch user info (requires Authorization header)
      const userRes = await apiClient.get("/accounts/user/", {
        headers: {
          Authorization: `Bearer ${access}`,
          "Content-Type": "application/json",
        },
      });

      console.log("User Info:", userRes.data);
      const { role } = userRes.data;
      localStorage.setItem("role", role);

      // 4. Redirect based on role
      if (role === "hr") {
        navigate("/hr-dashboard");
      } else if (role === "candidate") {
        navigate("/candidate-dashboard");
      } else {
        setError("Unknown user role");
      }
    } catch (err) {
      console.error(err);
      setError("Invalid credentials or server error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5 mt-5">
        <h2 className="text-center mb-4 text-dark mb-4">Login</h2>
        <div className="row justify-content-center">
          {error && <div className="alert alert-danger">{error}</div>}
          <form
            onSubmit={handleLogin}
            className="border p-4 rounded shadow-sm bg-light"
            style={{ width: "100%" }}
          >
            <div className="mb-3">
              <label>Username</label>
              <input
                name="username"
                type="text"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label>Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-dark w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
