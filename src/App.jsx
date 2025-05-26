import React, { useEffect, useState } from "react";
import { RetellWebClient } from "retell-client-js-sdk";
import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const retellWebClient = new RetellWebClient();

function App() {
  const [isCalling, setIsCalling] = useState(false);
  const [statusText, setStatusText] = useState("Active & Ready for Calls");
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsProcessing((prev) => !prev);
      setStatusText((prev) =>
        prev === "Active & Ready for Calls" ? "Processing Request..." : "Active & Ready for Calls"
      );
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const startCall = async () => {
    setLoading(true);
    setStatusText("Requesting access token...");

    try {
      const response = await fetch("https://nxsolutions.app.n8n.cloud/webhook/api/create-web-call/", {
        method: "POST",
      });
      const data = await response.json();
      const callInfo = Array.isArray(data) ? data[0] : data;

      if (!callInfo?.access_token) throw new Error("No access_token in response");

      await retellWebClient.startCall({
        accessToken: callInfo.access_token,
        sampleRate: 24000,
        captureDeviceId: "default",
        emitRawAudioSamples: false,
      });

      setIsCalling(true);
      setStatusText("📞 Call started");
    } catch (err) {
      console.error("❌ Failed to start call:", err);
      setStatusText("❌ Failed to start call");
    } finally {
      setLoading(false);
    }
  };

  const stopCall = () => {
    retellWebClient.stopCall();
    setIsCalling(false);
    setStatusText("📴 Call ended");
  };

  useEffect(() => {
    retellWebClient.on("call_started", () => {
      setStatusText("Call is live");
    });

    retellWebClient.on("call_ended", () => {
      setStatusText("Call ended");
      setIsCalling(false);
    });

    retellWebClient.on("update", (update) => {
      console.log("📝 Transcript:", update.transcript);
    });

    retellWebClient.on("error", (err) => {
      console.error("⚠️ Call error:", err);
      setStatusText("⚠️ Call error");
      stopCall();
    });
  }, []);

  return (
    <div className="agent-card">
      <div className="company-header">
        <div className="company-name">NOVEL NEX SOLUTIONS</div>
        <div className="company-tagline">AI Voice Agent Platform</div>
      </div>

      <div className="agent-content">
        <div className="agent-image-container">
          <img
            src="https://t4.ftcdn.net/jpg/08/31/29/53/360_F_831295347_sP2KMjJnJLUH5JS13mHt7JkfkYCnr7Iz.jpg"
            alt="Alena AI Agent"
            className="agent-image"
          />
          <div className="ai-icon">
            <i className="fas fa-robot"></i>
          </div>
        </div>

        <h2 className="agent-name">Alena</h2>
        <p className="agent-title">Your AI Voice Assistant</p>

        <div className="status">
          <span className={`status-indicator ${isProcessing ? "processing" : ""}`}></span>
          <span className="status-text">{statusText}</span>
        </div>

        <button
          className="call-btn"
          onClick={isCalling ? stopCall : startCall}
          disabled={loading}
        >
          <i className="fas fa-phone-alt"></i>
          <span>{loading ? "Connecting..." : isCalling ? "End Call" : "Start Voice Call"}</span>
        </button>

        <div className="features">
          <div className="feature">
            <i className="fas fa-microphone"></i>
            <span>Natural Voice</span>
          </div>
          <div className="feature">
            <i className="fas fa-brain"></i>
            <span>AI Powered</span>
          </div>
          <div className="feature">
            <i className="fas fa-clock"></i>
            <span>24/7 Available</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
