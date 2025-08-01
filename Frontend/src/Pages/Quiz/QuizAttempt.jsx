import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";
import Nav from "../../components/Nav";

const QuizAttemptPage = () => {
  const { quizId, attemptId } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [quizTitle, setQuizTitle] = useState("");
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await apiClient.post(`/quizzes/${quizId}/start/`);
        setQuestions(res.data.questions);
        console.log("Quiz Questions:", res.data.questions);
        setQuizTitle(res.data.title || "Quiz");
      } catch (error) {
        console.error("Failed to load quiz", error);
        alert("Quiz could not be loaded.");
      }
    };

    fetchQuestions();
  }, [quizId]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionId]: selectedOption }));
  };

const handleSubmit = async () => {
  try {
    const res = await apiClient.post(`/quizzes/${quizId}/complete/`, {
      answers: answers,
    });

    const { score, total, results } = res.data;
    setResultData(res.data);
    console.log("Quiz Results:", results);
    // alert(`You scored ${score} out of ${total}`);

    // Optional: navigate to results page or display results here
    // navigate("/domain-quizzes"); // or show result below
  } catch (error) {
    console.error("Submission error", error);
    alert("Failed to submit quiz");
  }
};

  return (
    <>
      <Nav />
      <div className="container bg-dark border rounded mt-4">
        <h2 className="mb-4 mt-4 text-info">Quiz</h2>

        <div className="row">
          {questions.map((q, idx) => (
            <div key={q.id} className="col-md-6 mb-4">
              <div className="p-3 bg-secondary text-info border rounded h-100">
                <h5>
                  Q{idx + 1}: {q.text}
                </h5>
                {["A", "B", "C", "D"].map((opt) => (
                  <div className="form-check" key={opt}>
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${q.id}`}
                      value={opt}
                      checked={answers[q.id] === opt}
                      onChange={() => handleOptionChange(q.id, opt)}
                    />
                    <label className="form-check-label text-white fw-semibold">
                      {q[`option_${opt}`]}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-primary mb-4" onClick={handleSubmit}>
          Submit Quiz
        </button>
      </div>

      {resultData && resultData.results && (
        <div className="mt-5">
          <h4>Results</h4>
          <p className="text-dark fw-bold">
            Score: {resultData.score} / {resultData.total}
          </p>
          {resultData.results.map((r, idx) => (
            <div
              key={idx}
              className={`p-2 mb-2 border ${
                r.is_correct ? "bg-success text-white" : "bg-danger text-white"
              }`}
            >
              <strong>
                Q{idx + 1}: {r.question}
              </strong>
              <br />
              Your Answer: {r.your_answer}
              <br />
              Correct Answer: {r.correct_answer}
            </div>
          ))}
          <button
            className="btn btn-secondary mt-3"
            onClick={() => navigate("/domain-quizzes")}
          >
            Back to Quiz
          </button>
        </div>
      )}
    </>
  );
};

export default QuizAttemptPage;
