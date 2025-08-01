import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";

const DomainQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await apiClient.get("/quizzes/domainquizzes/");
        setQuizzes(res.data);
      } catch (err) {
        console.error("Failed to fetch quizzes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleStartQuiz = async (quizId) => {
    try {
      const res = await apiClient.post(`/quizzes/${quizId}/start/`);
      const { attempt_id } = res.data;
      setMessage("Quiz started successfully! Redirecting...");
      // alert("Quiz started! Redirecting...");
      setTimeout(() => {
        navigate(`/quiz/${quizId}/attempt/${attempt_id}`);
      }, 1000); // Redirect after 1 second
    } catch (error) {
      console.error("Error starting quiz", error);
      if (error.response?.data?.detail) {
        alert(error.response.data.detail);
      } else {
        alert("Something went wrong while starting the quiz.");
      }
    }
  };

  const renderButton = (quiz) => {
    switch (quiz.status) {
      case "completed":
        return (
          <button className="btn btn-success w-100" disabled>
            ✅ Completed
          </button>
        );
      case "in_progress":
        return (
          <button
            className="btn btn-warning w-100 fw-semibold"
            onClick={() => handleStartQuiz(quiz.id)}
          >
            ⏳ Resume Quiz
          </button>
        );
      case "not_started":
      default:
        return (
          <button
            className="btn btn-info w-100 text-dark fw-semibold"
            onClick={() => handleStartQuiz(quiz.id)}
          >
            ▶️ Start Quiz
          </button>
        );
    }
  };

  return (
    <>
      <Nav />
      <div className="container py-5 bg-dark rounded-4 shadow">
        <h2 className="text-center fw-bold text-info mb-4">
          📘 Domain Quizzes
        </h2>
        {message && (
          <div className="alert alert-success text-center">
            {message}
          </div>
        )}
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-info" role="status" />
            <p>Loading quizzes...</p>
          </div>
        ) : (
          <div className="row justify-content-center">
            {quizzes.length === 0 ? (
              <p className="text-center text-muted">No quizzes available.</p>
            ) : (
              quizzes.map((quiz) => (
                <div className="col-md-6 col-lg-4 mb-4" key={quiz.id}>
                  <div className="card h-100 shadow rounded-4 border-0">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="card-title text-info fw-bold">
                          {quiz.title}
                        </h5>
                        <p className="card-text text-dark">
                          {quiz.description}
                        </p>
                        <p className="badge bg-secondary">{quiz.domain}</p>
                      </div>
                      <div className="mt-3">{renderButton(quiz)}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DomainQuizzes;
