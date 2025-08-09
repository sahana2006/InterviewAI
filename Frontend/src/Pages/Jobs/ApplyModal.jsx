import React, { useState, useEffect } from "react";
import apiClient from "../../api/apiClient";

const ApplyModal = ({ show, onClose, job, onSubmit }) => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch logged-in user details when modal opens
  useEffect(() => {
    if (show) {
      const fetchUser = async () => {
        try {
          const res = await apiClient.get("/accounts/user/");
          setUserData({
            name: res.data.username || "",
            email: res.data.email || "",
          });
        } catch (err) {
          console.error("Failed to fetch user data", err);
        }
      };
      fetchUser();
    }
  }, [show]);

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resume) {
      alert("Please attach your resume before submitting.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("job_id", job?.id || "");
    formData.append("resume", resume);

    onSubmit(formData);
    setLoading(false);
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title fw-bold text-primary">
              Apply for {job?.title || "this position"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-3">
                <label className="form-label fw-bold">Name</label>
                <input
                  type="text"
                  value={userData.name}
                  readOnly
                  className="form-control"
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label fw-bold">Email</label>
                <input
                  type="email"
                  value={userData.email}
                  readOnly
                  className="form-control"
                />
              </div>

              {/* Resume */}
              <div className="mb-3">
                <label className="form-label fw-bold">Attach Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="form-control"
                  required
                />
              </div>

              {/* Footer Buttons */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-info"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplyModal;
