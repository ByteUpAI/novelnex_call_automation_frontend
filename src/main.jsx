import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { RetellWebClient } from "retell-client-js-sdk";

const retellWebClient = new RetellWebClient();

function App() {
  const [isCalling, setIsCalling] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const startCall = async () => {
    console.log("▶️ Start Call button clicked");
    setLoading(true);
    setStatus("Requesting access token...");
  
    try {
      const response = await fetch("https://nxsolutions.app.n8n.cloud/webhook/api/create-web-call/", {
        method: "POST",
      });
      const data = await response.json();
  
      console.log("🔍 Full response from n8n:", data);
  
      const callInfo = Array.isArray(data) && data.length > 0 ? data[0] : null;
  
      if (!callInfo || !callInfo.access_token) {
        throw new Error("No access_token in response");
      }
  
      console.log("✅ Access token received:", callInfo.access_token);
  
      setStatus("Starting call...");
  
      await retellWebClient.startCall({
        accessToken: callInfo.access_token,
        sampleRate: 24000,
        captureDeviceId: "default",
        emitRawAudioSamples: false,
      });
  
      setIsCalling(true);
      setStatus("📞 Call started");
    } catch (err) {
      console.error("❌ Failed to start call:", err);
      setStatus("❌ Failed to start call");
    } finally {
      setLoading(false);
    }
  };
  

  const stopCall = () => {
    console.log("🛑 Stop Call button clicked");
    retellWebClient.stopCall();
    setIsCalling(false);
    setStatus("📴 Call ended");
  };

  useEffect(() => {
    retellWebClient.on("call_started", () => {
      console.log("✅ Retell: call_started");
      setStatus("Call is live");
    });

    retellWebClient.on("call_ended", () => {
      console.log("⛔ Retell: call_ended");
      setStatus("Call ended");
      setIsCalling(false);
    });

    retellWebClient.on("update", (update) => {
      console.log("📝 Transcript:", update.transcript);
    });

    retellWebClient.on("error", (err) => {
      console.error("⚠️ Error during call:", err);
      setStatus("⚠️ Call error");
      stopCall();
    });
  }, []);

  return (
    <div style={{ padding: 30, fontFamily: "sans-serif" }}>
      <h1>📞 Novel Nex Solutions</h1>
      <p><strong>Status:</strong> {status}</p>
      {!isCalling ? (
        <button onClick={startCall} disabled={loading}>
          {loading ? "Starting..." : "Start Call"}
        </button>
      ) : (
        <button onClick={stopCall}>Stop Call</button>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
