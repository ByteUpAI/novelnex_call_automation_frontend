import React from "react";
import ChatInterface from "../components/ChatInterface";

function Chat({ onNavigateToHome }) {
  return (
    <div className="chat-page">
      <ChatInterface onNavigateToHome={onNavigateToHome} />
    </div>
  );
}

export default Chat;
