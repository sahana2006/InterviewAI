# resumeapp/resume_crew.py

from crewai import Agent, Task, Crew

from langchain.chat_models import ChatLiteLLM

# --- Load Ollama LLM ---
llm = ChatLiteLLM(
    model="ollama/mistral",
    api_base="http://localhost:11434"
)

# --- Define Specialized Agents ---
resume_agent = Agent(
    role="Resume Expert",
    goal="Understand and summarize the candidate's resume details like skills, experience, education.",
    backstory="You are a seasoned career coach who specializes in resume analysis.",
    allow_delegation=False,
    verbose=True,
    llm=llm
)

matcher_agent = Agent(
    role="Job Matcher",
    goal="Compare resume against job description and identify gaps and strengths.",
    backstory="You are an expert in matching resumes with job descriptions for tech roles.",
    allow_delegation=False,
    verbose=True,
    llm=llm
)

improvement_agent = Agent(
    role="Improvement Coach",
    goal="Suggest improvements to better align the resume with the JD.",
    backstory="You help candidates improve their resumes to match job expectations.",
    allow_delegation=False,
    verbose=True,
    llm=llm
)

# --- Resume Coach Crew ---
def run_resume_coach(resume_text, jd_text):

    # Task 1: Analyze Resume
    task1 = Task(
        description=f"Analyze this resume:\n{resume_text}",
        expected_output=(
            "A comprehensive summary of the candidate's resume including key skills, qualifications, experience, and strengths."
        ),
        agent=resume_agent
    )

    # Task 2: Compare with Job Description
    task2 = Task(
        description=f"Based on the resume and this job description:\n{jd_text}\n\nCompare and list matching and missing skills.",
        expected_output=(
            "A bullet-pointed comparison of skills: one list of matched skills and another of missing or underrepresented skills."
        ),
        agent=matcher_agent
    )

    # Task 3: Suggest Improvements
    task3 = Task(
        description=f"Give clear and actionable suggestions to improve the resume to better match this JD:\n{jd_text}",
        expected_output=(
            "A list of concrete recommendations to improve the resume, such as adding specific keywords, restructuring sections, or emphasizing particular achievements."
        ),
        agent=improvement_agent
    )

    # Assemble Crew
    crew = Crew(
        agents=[resume_agent, matcher_agent, improvement_agent],
        tasks=[task1, task2, task3],
        verbose=True
    )

    result = crew.kickoff()
    return result
