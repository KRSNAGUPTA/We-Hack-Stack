import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // Stores chat history
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/v1/chat", {
        message: input,
      });

      const botReply = { sender: "bot", text: res.data.reply };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = { sender: "bot", text: "Something went wrong. Please try again!" };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50p-4">
      <div className="w-full max-w-6xl  shadow-lg rounded-lg p-4 bg-gray-500">
        <h1 className="text-2xl font-bold text-center mb-4">Legal Chatbot</h1>
        
        <div className="h-[700px] overflow-y-auto border p-3 rounded-md bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`p-2 my-1 rounded-md ${msg.sender === "user" ? "bg-blue-200 text-right" : "bg-gray-300 text-left"}`}>
              <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
            </div>
          ))}
        </div>

        <div className="mt-4 flex">
          <input
            type="text"
            className="flex-1 p-2 border rounded-md"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button
            className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-md disabled:opacity-50"
            onClick={handleSend}
            disabled={loading}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
