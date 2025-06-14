import React from "react";
import VoiceAgent from "../components/VoiceAgent";

function Home({ onNavigateToChat }) {
  return (
    <div className="home-page">
      <VoiceAgent onNavigateToChat={onNavigateToChat} />
    </div>
  );
}

export default Home;
