import React from "react";
import "./ChatbotToggle.css";

const botIcon = "/image/ChatBot.jpg";

const ChatbotToggle = ({ onClick }) => (
  <div
    onClick={onClick}
    className="chatbot-toggle"
    title="Ask AI"
  >
    <img src={botIcon} alt="Chatbot" className="chatbot-icon" />
  </div>
);

export default ChatbotToggle;
