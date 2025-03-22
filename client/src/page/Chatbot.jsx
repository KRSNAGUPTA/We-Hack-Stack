import { useState } from 'react';
import { getChatResponse } from './../utils/chatbotApi';

const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setChatHistory([...chatHistory, userMessage]);

    setMessage('');

    const botReply = await getChatResponse(message);
    setChatHistory([...chatHistory, userMessage, { role: 'bot', content: botReply }]);
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-gray-300 shadow-md rounded-lg h-full">
      <div className="h-72 overflow-y-auto bg-blue-200 p-4 rounded-md">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`my-2 p-2 ${chat.role === 'user' ? 'bg-gray-400 text-black-800 text-right' : 'bg-gray-300 text-gray-800 text-left'} rounded-md`}>
            {chat.content}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask something..."
          className="flex-grow p-2 border rounded-l-md"
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-r-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
