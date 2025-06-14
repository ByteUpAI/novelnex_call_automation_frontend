// import React, { useState, useRef, useEffect } from "react";
// import { sendChatMessage } from "../utils/api";
// import "../styles/ChatInterface.css";
// import "@fortawesome/fontawesome-free/css/all.min.css";

// function ChatInterface({ onNavigateToHome }) {
//   const [messages, setMessages] = useState([
//     {
//       id: 1,
//       text: "Hello! I'm Aleena, your AI assistant. How can I help you today?",
//       sender: "bot",
//       timestamp: new Date(),
//     },
//   ]);
//   const [inputText, setInputText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [sessionId] = useState(
//     () => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
//   );
//   const messagesEndRef = useRef(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!inputText.trim() || isLoading) return;

//     const userMessage = {
//       id: Date.now(),
//       text: inputText.trim(),
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInputText("");
//     setIsLoading(true);

//     try {
//       const response = await sendChatMessage(sessionId, userMessage.text);

//       const botMessage = {
//         id: Date.now() + 1,
//         text:
//           response.message ||
//           "I'm sorry, I couldn't process your request at the moment.",
//         sender: "bot",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Chat error:", error);
//       const errorMessage = {
//         id: Date.now() + 1,
//         text: "I'm sorry, there was an error processing your message. Please try again.",
//         sender: "bot",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const formatTime = (timestamp) => {
//     return timestamp.toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">
//         <button className="back-btn" onClick={onNavigateToHome}>
//           <i className="fas fa-arrow-left"></i>
//         </button>
//         <div className="chat-header-info">
//           <div className="agent-avatar">
//             <img src="/images/aleena_img.jpeg" alt="Aleena" />
//             <div className="status-dot"></div>
//           </div>
//           <div className="agent-info">
//             <h3>Aleena</h3>
//             <span className="agent-status">Online</span>
//           </div>
//         </div>
//         <div className="chat-actions">
//           <button className="action-btn">
//             <i className="fas fa-phone"></i>
//           </button>
//         </div>
//       </div>

//       <div className="messages-container">
//         <div className="messages">
//           {messages.map((message) => (
//             <div
//               key={message.id}
//               className={`message ${
//                 message.sender === "user" ? "user-message" : "bot-message"
//               }`}
//             >
//               <div className="message-content">
//                 <p>{message.text}</p>
//                 <span className="message-time">
//                   {formatTime(message.timestamp)}
//                 </span>
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div className="message bot-message">
//               <div className="message-content">
//                 <div className="typing-indicator">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//               </div>
//             </div>
//           )}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       <form className="message-input-container" onSubmit={handleSendMessage}>
//         <div className="input-wrapper">
//           <input
//             type="text"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             placeholder="Type a message..."
//             className="message-input"
//             disabled={isLoading}
//           />
//           <button
//             type="submit"
//             className="send-btn"
//             disabled={!inputText.trim() || isLoading}
//           >
//             <i className="fas fa-paper-plane"></i>
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default ChatInterface;

import React, { useState, useRef, useEffect } from "react";
import { sendChatMessage } from "../utils/API";
import "../styles/ChatInterface.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

function ChatInterface({ onNavigateToHome }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Aleena, your AI assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(
    () => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await sendChatMessage(sessionId, userMessage.text);

      const botMessage = {
        id: Date.now() + 1,
        text:
          response.response || // Changed from response.message to response.response
          "I'm sorry, I couldn't process your request at the moment.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, there was an error processing your message. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-btn" onClick={onNavigateToHome}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="chat-header-info">
          <div className="agent-avatar">
            <img src="/images/aleena_img.jpeg" alt="Aleena" />
            <div className="status-dot"></div>
          </div>
          <div className="agent-info">
            <h3>Aleena</h3>
            <span className="agent-status">Online</span>
          </div>
        </div>
        <div className="chat-actions">
          <button className="action-btn">
            <i className="fas fa-phone"></i>
          </button>
        </div>
      </div>

      <div className="messages-container">
        <div className="messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${
                message.sender === "user" ? "user-message" : "bot-message"
              }`}
            >
              <div className="message-content">
                <p>{message.text}</p>
                <span className="message-time">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message bot-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form className="message-input-container" onSubmit={handleSendMessage}>
        <div className="input-wrapper">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type a message..."
            className="message-input"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="send-btn"
            disabled={!inputText.trim() || isLoading}
          >
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInterface;
