import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../../api/apiClient"; // your axios instance
import Nav from "../../Components/Nav";

const InterviewResults = () => {
  const { session_id } = useParams();
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await apiClient.get(`/interview/${session_id}/evaluate/`);
        setFeedback(res.data.feedback);
      } catch (err) {
        console.error("Error fetching results", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [session_id]);

  return (
    <>
      <Nav />
      <div className="container mt-4 bg-dark p-5 rounded text-info">
        <h2>Interview Feedback</h2>
        {loading ? (
          <div>Loading evaluation...</div>
        ) : (
          <pre
            className="bg-light text-dark fw-semibold p-3 rounded mt-3 fs-7"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {feedback}
          </pre>
        )}
      </div>
    </>
  );
};

export default InterviewResults;
