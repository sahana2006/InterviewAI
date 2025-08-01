# utils.py
# This function talks to your Mistral LLM, asks it to generate questions, parses the JSON, and returns a Python list of questions.
import requests
import json

def generate_questions_with_mistral(domain, num_questions=3):
    print(f"Generating {num_questions} questions for domain: {domain}")
    prompt = f"""
You are a technical interviewer.

Generate {num_questions} diverse, structured interview questions for the domain: "{domain}".
Make the first question easy and the rest increasingly difficult. Just return a JSON list of questions.

Respond ONLY as a JSON list:
[
  "Question": "Your question here", "difficulty": "Beginner",
  "Question": "Your question here", "difficulty": "Intermediate",
  "Question": "Your question here", "difficulty": "Advanced"
]
"""

    response = requests.post(
        "http://localhost:11434/api/generate",  # Change if you're using Ollama remotely
        json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False
        }
    )
    print("Mistral response status:", response.status_code)
    try:
        data = response.json()
        questions_json = data["response"]
        questions = json.loads(questions_json)
        print("Generated questions:", questions)
        return questions
    except Exception as e:
        print("Error parsing Mistral response:", e)
        return []


import requests

def score_answer_with_mistral(question, answer):
    prompt = f"""
Evaluate the following answer to the given interview question.

Question: {question}
Answer: {answer}

Give a score between 0 and 10 based on relevance, completeness, and correctness. Just return the number.
"""

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "mistral",
                "prompt": prompt,
                "stream": False
            }
        )
        data = response.json()

        # Ollama responds with JSON like: {"response": "7.5", ...}
        score_text = data.get("response", "").strip()

        return float(score_text)

    except Exception as e:
        print(f"Error scoring answer: {e}")
        return 0.0
