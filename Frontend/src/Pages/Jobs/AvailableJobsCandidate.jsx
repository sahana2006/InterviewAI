import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import Nav from "../../components/Nav";
import ApplyModal from "./ApplyModal";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await apiClient.get("/hrsection/jobs/valid/");
        setJobs(response.data);
      } catch (err) {
        setError("Failed to fetch job listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setShowModal(true);
    console.log("Selected Job:", job);
  };

  const handleSubmitApplication = async (formData) => {
    try {
      await apiClient.post("/applications/submit/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Application submitted successfully!");
    } catch (err) {
      console.error("Error submitting application", err);
      alert("Failed to submit application.");
    } finally {
      setShowModal(false);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <>
      <Nav />
      <div className="container py-5 mt-5 bg-dark p-5 rounded">
        <h2 className="mb-4 text-info">Available Job Openings</h2>
        <div className="row">
          {jobs.map((job) => (
            <div key={job.id} className="col-md-6 p-3">
              <div className="bg-white border rounded shadow-sm p-3 h-100">
                <h3 className="text-xl font-semibold text-primary">
                  {job.title} - {job.hr}
                </h3>
                <hr className="mb-4 border-top border-dark" />
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Type:</strong> {job.job_type}
                </p>
                <p>
                  <strong>Skills:</strong> {job.required_skills}
                </p>
                <p>
                  <strong>Openings:</strong> {job.number_of_openings}
                </p>
                <p>
                  <strong>Deadline:</strong> {job.deadline}
                </p>
                <button
                  onClick={() => handleApplyClick(job)}
                  className="mt-2 bg-info text-white px-4 py-2 rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ApplyModal
        show={showModal}
        onClose={() => setShowModal(false)}
        job={selectedJob}
        onSubmit={handleSubmitApplication}
      />
    </>
  );
};

export default JobList;
