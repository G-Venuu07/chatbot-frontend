import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (message.trim() === "" || loading) {
      return;
    }

    const userMessage = message;

    setMessages((oldMessages) => [
      ...oldMessages,
      {
        sender: "user",
        text: userMessage
      }
    ]);

    setMessage("");
    setLoading(true);

    try {
      const result = await axios.get(
        "https://chatbot-backend-y0gs.onrender.com/api/chat",
        {
          params: {
            message: userMessage
          }
        }
      );

      setMessages((oldMessages) => [
        ...oldMessages,
        {
          sender: "ai",
          text: result.data
        }
      ]);
    } catch (error) {
      setMessages((oldMessages) => [
        ...oldMessages,
        {
          sender: "ai",
          text: "Something went wrong. Please try again."
        }
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="chat">
      <h1>AI Chatbot</h1>

      <div className="messages">
        {messages.length === 0 && (
          <p>
            <strong>Gemini:</strong> Hello! How can I help you?
          </p>
        )}

        {messages.map((msg, index) => (
          <p key={index}>
            <strong>
              {msg.sender === "user" ? "You" : "Gemini"}:
            </strong>{" "}
            {msg.text}
          </p>
        ))}

        {loading && (
          <p>
            <strong>Gemini:</strong> Thinking...
          </p>
        )}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage}>Send</button>

      <button onClick={clearChat}>Clear Chat</button>
    </div>
  );
}

export default App;