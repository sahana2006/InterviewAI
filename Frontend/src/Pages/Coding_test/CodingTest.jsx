import React, { useEffect, useState } from "react";
import apiClient from "../../api/apiClient"; // your configured axios instance
import Nav from "../../Components/Nav";
import { useNavigate } from "react-router-dom";  

const CodingTest = ({ userId }) => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await apiClient.get("/coding_test/questions/");
        setQuestions(res.data);
        setFilteredQuestions(res.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchQuestions();
  }, []);

  const categories = ["All", ...new Set(questions.map((q) => q.category))];

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setSelectedCategory(selected);

    if (selected === "All") {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(questions.filter((q) => q.category === selected));
    }
  };

  return (
    <>
      <Nav />
      <div className="container mt-5 bg-dark p-5 rounded">
        <h2 className="text-info fw-bold mb-4">
          <i className="bi bi-filter-circle me-2"></i>Filter by Category
        </h2>

        <div className="mb-4">
          <select
            className="form-select mb-4 text-dark fw-bold fs-5"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            {categories.map((categ, index) => (
              <option key={index} value={categ} className="text-dark fw-bold">
                {categ}
              </option>
            ))}
          </select>

          <div className="row">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="col-md-6 mb-3">
                <div
                  className="card h-100 shadow-sm cursor-pointer"
                  onClick={() => navigate(`/coding-test/question/${q.id}`)}
                >
                  <div className="card-body">
                    <h5 className="card-title text-dark fw-bold">{q.title}</h5>
                    <p className="card-text text-dark">
                      {q.description?.slice(0, 80)}...
                    </p>
                    <span className="badge bg-secondary">{q.category}</span>
                  </div>
                  <button
                    className="btn btn-info m-3 text-dark fw-semibold"
                    onClick={() => navigate(`/coding-test/question/${q.id}`)}
                  >
                    Let's Code
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CodingTest;