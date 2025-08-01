import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import Nav from "../../Components/Nav";

function InterviewPage() {
  const location = useLocation();
  const { session_id } = useParams();
  const navigate = useNavigate();

  // Initialize as an object instead of a string
  const [question, setQuestion] = useState(location.state?.question || {});
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!answer.trim()) return;

    setLoading(true);
    try {
      const res = await apiClient.post(
        `interview/${session_id}/answer/`,
        { answer },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.is_complete) {
        navigate(`/interview/${session_id}/results`);
      } else {
        // In case backend sends JSON as string, parse it
        console.log("Received next question:", res.data.next_question);
        const nextQ =
          typeof res.data.next_question === "string"
            ? JSON.parse(res.data.next_question)
            : res.data.next_question;

        setQuestion(nextQ);
        setAnswer("");
      }
    } catch (err) {
      console.error("Error submitting answer", err);
    } finally {
      setLoading(false);    // re-enable the submit button
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-5 bg-dark p-5 rounded text-info">
        {question?.Question ? (
          <>
            <h4>
              Question{" "}
              {question["difficulty"]
                ? `(${question["difficulty"]})`
                : ""}
              :
            </h4>
            <p className="lead text-light">{question.Question}</p>
          </>
        ) : (
          <p>Loading question...</p>
        )}

        <textarea
          className="form-control"
          rows={5}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
        />

        <button
          className="btn btn-info mt-3 text-dark fw-bold"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Answer"}
        </button>
      </div>
    </>
  );
}

export default InterviewPage;
