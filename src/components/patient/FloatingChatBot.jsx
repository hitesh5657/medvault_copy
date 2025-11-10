import React, { useState } from "react";
import ChatBot from "./ChatBot";
import "../../styles/FloatingChatBot.css";

function FloatingChatBot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Floating button */}
      <button
        className="floating-chat-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="floating-chat-window">
          <div className="floating-chat-header">
            ChatBot
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="floating-chat-messages">
            <ChatBot />
          </div>
        </div>
      )}
    </div>
  );
}

export default FloatingChatBot;
