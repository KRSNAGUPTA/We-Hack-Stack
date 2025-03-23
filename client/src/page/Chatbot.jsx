import { useState, useRef, useEffect } from "react";
import axios from "axios"; // Import axios
import {
  Shield,
  Send,
  Info,
  ArrowRight,
  Clock,
  FileText,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to Legal Lens! I'm here to help answer your legal questions in simple terms. What would you like to know about today?",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const [suggestions] = useState([
    "What are my tenant rights?",
    "How do I file a small claims case?",
    "What is the process for divorce?",
    "Explain consumer protection laws",
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/v1/chat", {
        message: input,
      });

      const botReply = {
        sender: "bot",
        text: res.data.reply,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botReply]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching response:", error);
      const errorMessage = {
        sender: "bot",
        text: "Something went wrong. Please try again!",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }x``
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <Header />
      </div>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-bold">
              Legal <span className="text-blue-600">Lens</span> 🔍
            </h1>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="bg-white rounded-lg shadow-md flex flex-col h-[calc(100vh-160px)]">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <h2 className="font-semibold">Legal Lens AI Assistant</h2>
              </div>
              <Badge variant="outline" className="bg-blue-50">
                Powered by Gemini
              </Badge>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col max-w-[85%] ${
                    msg.sender === "user" ? "ml-auto" : ""
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {msg.sender === "bot" ? (
                      <>
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Legal Lens</span>
                        <span className="text-xs text-gray-500">
                          {msg.timestamp}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs text-gray-500 ml-auto">
                          {msg.timestamp}
                        </span>
                        <span className="text-sm font-medium">You</span>
                      </>
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {msg.text.split("\n").map((line, i) => (
                      <p key={i} className={i > 0 ? "mt-2" : ""}>
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex max-w-[85%]">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Legal Lens</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 mt-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse delay-150"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse delay-300"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your legal question..."
                  className="flex-1 rounded-xl"
                />
                <Button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="gap-2 rounded-full"
                >
                  {loading ? "Sending..." : "Send"}
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {messages.length < 3 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Try asking about:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((suggestion, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs bg-blue-50 border-blue-100"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 text-xs text-gray-500 flex items-center gap-1">
                <Info className="h-3 w-3" />
                Information is for educational purposes only and not legal
                advice.
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:block w-80">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-blue-600" />
              Recent Topics
            </h3>
            <div className="space-y-2">
              {[
                "Tenant Rights",
                "Small Claims Court",
                "Employment Law",
                "Family Law",
              ].map((topic, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  size="sm"
                >
                  <ArrowRight className="h-4 w-4 mr-2" />
                  {topic}
                </Button>
              ))}
            </div>
          </div>

          <Card className="mb-4">
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                Related Resources
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="rounded-full w-1 h-1 bg-blue-600 mt-2"></div>
                  <a href="#" className="text-blue-600 hover:underline">
                    Guide to Tenant Rights
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full w-1 h-1 bg-blue-600 mt-2"></div>
                  <a href="#" className="text-blue-600 hover:underline">
                    Understanding Lease Agreements
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <div className="rounded-full w-1 h-1 bg-blue-600 mt-2"></div>
                  <a href="#" className="text-blue-600 hover:underline">
                    Security Deposit Law
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                Daily Legal Tip
              </h3>
              <p className="text-sm text-gray-700">
                Always read contracts carefully before signing. Request time to
                review and don't be pressured into immediate signatures.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
