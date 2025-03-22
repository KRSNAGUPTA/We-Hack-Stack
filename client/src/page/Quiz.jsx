import { useState } from "react";

export default function QuizPage() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const fetchQuiz = async () => {
    if (!topic.trim()) {
      setError("Please enter a valid topic.");
      return;
    }

    setLoading(true);
    setError("");
    setQuiz([]);

    try {
      const response = await fetch("http://localhost:3000/api/v1/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty }),
      });

      if (!response.ok) throw new Error(`Server Error: ${response.status}`);

      const data = await response.json();

    if (!Array.isArray(data.quiz) || data.quiz.length === 0) {
        throw new Error("No quiz data received.");
    }

    setQuiz(data.quiz);

    } catch (err) {
      setError(err.message || "Failed to fetch quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (questionIndex, option) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4">Generate a Dynamic Quiz</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 border rounded mb-3"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={fetchQuiz}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>

        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>

      {quiz.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-3">Your Quiz</h2>

          {quiz.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              <div className="mt-2">
                {q.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(index, option)}
                    className={`block w-full p-2 border rounded mb-2 ${
                      selectedAnswers[index] === option ? "bg-blue-300" : "bg-gray-200"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
