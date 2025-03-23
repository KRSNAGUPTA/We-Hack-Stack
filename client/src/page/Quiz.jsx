import { useState } from "react";
import { RefreshCw } from "lucide-react";

export default function LegalQuiz() {
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
      const response = await api.post(
        "/daily-quiz/random?size",{ topic, difficulty }
      );
      // const response = await fetch("http://localhost:3000/api/v1/quiz", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ topic, difficulty }),
      // });

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
    <div className="min-h-screen p-4 bg-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Generate a Dynamic Quiz
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-3">
        <input
          type="text"
          placeholder="Enter topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-300"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-300"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          onClick={fetchQuiz}
          disabled={loading}
          className="w-full bg-indigo-600 text-white p-3 rounded hover:bg-indigo-700 disabled:bg-gray-400 flex items-center justify-center"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> Generating...
            </>
          ) : (
            "Generate Quiz"
          )}
        </button>

        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
      </div>

      {quiz.length > 0 && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl space-y-4">
          <h2 className="text-2xl font-bold mb-4">Your Quiz</h2>

          {quiz.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold mb-2">
                {index + 1}. {q.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(index, option)}
                    className={`w-full p-3 border rounded text-left transition-all ${
                      selectedAnswers[index] === option
                        ? "bg-indigo-100 border-indigo-400"
                        : "bg-gray-100 hover:bg-indigo-50"
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
