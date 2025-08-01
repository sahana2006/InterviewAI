import React, { useState } from "react";
import Nav_HR from "../../Components/Nav_HR";
import apiClient from "../../api/apiClient";

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    required_skills: "",
    number_of_openings: 1,
    job_type: "Full-time",
    deadline: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const response = await apiClient.get("/api/hr/jobs/create/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setStatus("Job posted successfully!");
      setFormData({
        title: "",
        location: "",
        required_skills: "",
        number_of_openings: 1,
        job_type: "Full-time",
        deadline: "",
      });
    } catch (error) {
      console.error("Error posting job:", error);
      setStatus("Failed to post job.");
    }
  };

  return (
    <>
      <Nav_HR />
      <div className="container py-5 bg-dark rounded-4 shadow">
        <h2 className="text-info">Post a New Job</h2>
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit} className="text-white">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Job Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  name="location"
                  className="form-control"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">
                  Required Skills (comma-separated)
                </label>
                <input
                  type="text"
                  name="required_skills"
                  className="form-control"
                  value={formData.required_skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Django, MySQL"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Number of Openings</label>
                <input
                  type="number"
                  name="number_of_openings"
                  className="form-control"
                  value={formData.number_of_openings}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Job Type</label>
                <select
                  name="job_type"
                  className="form-select"
                  value={formData.job_type}
                  onChange={handleChange}
                  required
                >
                  <option>Full-time</option>
                  <option>Intern</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Deadline to Apply</label>
                <input
                  type="date"
                  name="deadline"
                  className="form-control"
                  value={formData.deadline}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button type="submit" className="btn btn-info mt-4">
              Post Job
            </button>
          </form>
        </div>
        {status && <div className="mt-3 alert alert-info">{status}</div>}
      </div>
    </>
  );
};

export default JobPostForm;
