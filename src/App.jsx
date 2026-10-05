import { useState } from "react";
import axios from "axios";
function App() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const sendMessage = async () => {
    if (message.trim() === "") {
      return;
    }
    setLoading(true);

    try {

      const result = await axios.get(
        "http://localhost:8080/api/chat",
        {
          params: {
            message: message
          }
        }
      );

      setResponse(result.data);

    } catch (error) {

      setResponse("Something went wrong. Please try again.");

    }

    setMessage("");
    setLoading(false);
  };
  return (
    <div className="chat">
      <h1>AI Chatbot</h1>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
      />

      <button onClick={sendMessage}>Send</button>

      <div>
      <p><strong>You:</strong> {message}</p>
      <p>
      <strong>Gemini:</strong>{" "}
      {loading ? "Thinking..." : response}
    </p>
    </div>
    </div>
  );
}

export default App;