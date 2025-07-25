/*
🔧 Overview of Features to Implement
Chatbot Avatar (robot image) – clickable to open chat window.
Chat Window UI – displays suggestions like "Summarize blog", "Explain key concepts", etc.
OpenAI API integration – fetch response based on blog content + comments.
Backend API – securely call OpenAI API using blog ID to fetch blog and comments from DB.
Frontend to Backend flow – passes prompts and displays replies dynamically.
*/
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
