import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import { useNavigate } from "react-router-dom";
import Nav from "../../Components/Nav";

function DomainSelection() {
  const [domains, setDomains] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await apiClient.get("interview/domains/");
        console.log("Fetched domains:", response.data);
        setDomains(response.data.domains);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    fetchDomains();
  }, []);

    const startInterview = async (domain) => {
      try {
        const response = await apiClient.post("interview/start/", { domain });

        const { session_id, question } = response.data;
        console.log("Interview started:", session_id, question);
        // Navigate to interview page with session_id and question
        navigate(`/interview/${session_id}`, {
          state: {
            domain,
            question,
          },
        });
      } catch (error) {
        console.error("Error starting interview:", error);
        alert("Failed to start interview. Please try again.");
      }
    };

  return (
    <>
    <Nav />
        <div className="container mt-5 bg-dark p-5 rounded">
         <h2 className="text-info mb-4 fw-bold">Select a Domain</h2>
         <div className="row">
          {domains.map((domain, idx) => (
            <div className="col-md-4 mb-3" key={idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title text-dark fw-semibold">{domain}</h5>
                  <button
                    className="btn btn-info mt-3 text-dark fw-bold"
                    onClick={() => startInterview(domain)}
                  >
                    Start Interview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DomainSelection;
