import React, { useState } from "react";
import apiClient from "../api/apiClient"; // Adjust the path as needed
import Nav from "../components/Nav";

const ResumeCoach = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) return alert("Please upload your resume.");

    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      const res = await apiClient.post("/resumeapp/resume/coach/", formData);
      setResponse(res.data.analysis || "Success!");
    } catch (error) {
      console.error(error);
      setResponse("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div className="container py-5 bg-dark p-5 rounded">
        <h2 className="mb-4 text-info">Resume Coach</h2>
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
          <div className="mb-3">
            <label htmlFor="resume" className="form-label text-dark fw-bold">
              Upload Resume (PDF)
            </label>
            <input
              type="file"
              accept=".pdf"
              className="form-control"
              id="resume"
              onChange={(e) => setResumeFile(e.target.files[0])}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="jobDesc" className="form-label text-dark fw-bold">
              Job Description (Optional)
            </label>
            <textarea
              className="form-control"
              id="jobDesc"
              rows="5"
              placeholder="Paste a job description to get tailored feedback..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-info w-100 text-dark fw-bold"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Get Feedback"}
          </button>
        </form>

        {response && response.raw && (
          <div className="alert alert-info mt-4">
            <h5 className="text-primary fw-bold mb-3 fs-4">Resume Coach Result</h5>
            <pre className="text-dark fs-6">{response.raw}</pre>
          </div>
        )}
      </div>
    </>
  );
};

export default ResumeCoach;
