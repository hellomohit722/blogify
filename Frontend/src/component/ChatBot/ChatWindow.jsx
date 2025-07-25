import { useState, useEffect } from "react";
import UseUser from "../UserContext/UserContext";
import axiosInstance from "../API/axiosInstance";
import toast from "react-hot-toast";
import "./ChatWindow.css";


const ChatWindow = ({ blogId , onClick }) => {
  const {setCurrentUser } = UseUser();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const fetchUserAndChat = async () => {
      try {
        const resUser = await axiosInstance.get("/home");
        setCurrentUser(resUser.data.user);

        const resChat = await axiosInstance.get(`/chatbot/history/${blogId}`);

        setMessages(resChat.data.messages || []);
      } catch (error) {
        toast.error("Failed to load user or chat history.");
        console.error("Error:", error);
      }
    };

    fetchUserAndChat();
  }, [blogId, setCurrentUser]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await axiosInstance.post("/chatbot", {
        blogId,
        message: input,
      });

      const botMessage = { role: "assistant", content: res.data.reply };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      toast.error("Failed to send message.");
      console.error("Chat error:", error);
    }
    setInput("");
  };

  return (
    <div className="chat-window">
    <button className="chat-close-button" title="close" onClick={onClick}>❌</button>
      <hr style={{ border: "none", borderTop: "1px solid #eee", marginTop: "-1.5rem", marginBottom: "0.5rem" }} />
      <div className="chat-messages">
        {messages.length === 0 && <div className="chat-message bot">Start Conversation with AI</div>}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.role === "user" ? "user" : "bot"}`}
          >
            <span className={`chat-bubble ${msg.role}`}>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="chat-quick-buttons">
        <button className="chat-quick-button" onClick={() => setInput("Summarize this blog")}>Summarize</button>
        <button className="chat-quick-button" onClick={() => setInput("Explain key concepts")}>Key Concepts</button>
      </div>
      <div className="chat-input-row">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
        />
        <button onClick={sendMessage} className="chat-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;