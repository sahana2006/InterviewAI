import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import Nav from "../../components/Nav";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                    <h3 className="text-xl font-semibold text-primary">{job.title} - {job.hr}</h3>
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
                      onClick={() => handleApply(job.id)}
                      className="mt-2 bg-info text-white px-4 py-2 rounded"
                    >
                      Apply
                    </button>
                </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const handleApply = (jobId) => {
  // redirect to job application form or modal
  console.log("Applying for job:", jobId);
  // e.g., navigate(`/apply/${jobId}`) or open a modal
};

export default JobList;
