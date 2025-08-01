import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient";
import Nav from "../../Components/Nav";
import { useParams } from "react-router-dom";

const CodingTestDetail = () => {
  const { questionId } = useParams();
//   const selectedId = parseInt(selectedIdParam);
  const [question, setQuestion] = useState(null);
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [status, setStatus] = useState("");

    const languageOptions = [
      { name: "Python", id: 71 },
      { name: "C++", id: 54 },
      { name: "Java", id: 62 },
      { name: "JavaScript", id: 63 },
      // Add more languages & IDs from Judge0 docs
    ];

  useEffect(() => {
    const fetchQuestionDetail = async () => {
      console.log(questionId);
      if (!questionId) return;
      try {
        const res = await apiClient.get(`/coding_test/question/${questionId}/`);
        setQuestion(res.data);
        setFeedback(null);
        setStatus("");
        setCode("");
      } catch (err) {
        console.error("Error fetching question:", err);
      }
    };
    fetchQuestionDetail();
  }, [questionId]);

const handleSubmit = async () => {
  setLoading(true);
  setFeedback(null);
  setStatus("");
  console.log(language);

  try {
    const response = await apiClient.post("/coding_test/submit_code/", {
      code,
      question,
      language_id: language,
      stdin: question.input_data || "",
      expected_output: question.expected_output || "",
    });

    const result = response.data.result;
    console.log("Full result:", result);
    console.log("result.status:", result.status);
    console.log("result.stdout:", result.stdout);
    console.log("question.expected_output:", question.expected_output);
    
    // Defensive check
    if (result.status && result.status.description) {
      const cleanedStdout = result.stdout?.trim();
      const cleanedExpected = question.expected_output?.trim();

      if (
        result.status.description === "Accepted" &&
        cleanedStdout === cleanedExpected
      ) {
        setStatus("Passed");
      } else {
        setStatus("Failed");
      }

      setFeedback(`Output: ${cleanedStdout}\nExpected: ${cleanedExpected}`);
    } else {
      setStatus("Failed");
      setFeedback(
        result.stderr ||
          result.compile_output ||
          "Runtime Error (or incomplete response)"
      );
    }
  } catch (err) {
    console.error("Submission error:", err);
    setStatus("Error");
    setFeedback("Error submitting code.");
  }

  setLoading(false);
};

  return (
    <>
      <Nav />
      <div className="container mt-5 bg-dark p-5 rounded">
        {!question ? (
          <div className="text-center">
            <div className="spinner-border text-info" role="status"></div>
            <p className="mt-2 text-muted">Loading question...</p>
          </div>
        ) : (
          <div className="card shadow bg-light">
            <div className="card-body">
              <h4 className="card-title text-primary fw-bold">
                <i className="bi bi-code-slash me-2"></i>
                {question.title}
              </h4>
              <p className="card-text text-dark fw-semibold">
                {question.description}
              </p>

              {/* Sample Input/Output Section */}
              <div className="row mt-3">
                <div className="col-md-6">
                  <div className="border rounded p-3 bg-dark">
                    <h6 className="fw-bold text-info">Sample Input:</h6>
                    <pre className="mb-0 text-light">
                      {question.input_data || "N/A"}
                    </pre>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="border rounded p-3 bg-dark">
                    <h6 className="fw-bold text-info">Sample Output:</h6>
                    <pre className="mb-0 text-light">
                      {question.expected_output || "N/A"}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="mb-3 mt-4">
                <label
                  htmlFor="code"
                  className="form-label fw-bold text-primary fs-4"
                >
                  <i className="bi bi-terminal me-2"></i>Your Solution
                </label>

                {/* Select Language */}
                <div className="mb-3">
                  <label htmlFor="language" className="form-label fw-semibold">
                    <i className="bi bi-code me-2"></i>Select Language
                  </label>
                  <select
                    className="form-select"
                    value={language}
                    onChange={(e) => setLanguage(Number(e.target.value))}
                  >
                    {languageOptions.map((lang) => (
                      <option key={lang.id} value={lang.id}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  className="form-control font-monospace"
                  id="code"
                  rows="10"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="# Write your code here"
                ></textarea>
              </div>

              <button
                className="btn btn-info text-dark fw-bold"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Submitting...
                  </>
                ) : (
                  <>
                    <i className="bi bi-upload me-2"></i>Submit Code
                  </>
                )}
              </button>

              {status && (
                <div
                  className={`alert mt-4 ${
                    status === "Passed" ? "alert-success" : "alert-danger"
                  }`}
                >
                  <h5 className="mb-2">
                    <i className="bi bi-check-circle-fill me-2 text-success"></i>
                    Result: {status}
                  </h5>
                  <pre className="mb-0">{feedback}</pre>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CodingTestDetail;
