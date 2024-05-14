"use client";
import React, { useState } from "react";
import SpeechRecognitionButton from "@/components/SpeechButton";
import Layout from "../Layout";

export default function Priority() {
  const [voiceMode, setVoiceMode] = useState(false);

  const handleToggleVoiceMode = () => {
    setVoiceMode(!voiceMode);
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-heading">
          Toggle the slider to on or off voice mode
        </h1>

        <div className="pt-2" onClick={handleToggleVoiceMode}>
          <SpeechRecognitionButton />
        </div>

        {/* Pass voiceMode state as a prop if necessary */}
        <div>
          Instructions: To open a Workspace-
          <br /> Say{" "}
          <span className="text-green-500 font-semibold">
            "Open Workspace - (workspacename)"
          </span>
          <br /> or <br /> Say{" "}
          <span className="text-green-500 font-semibold">
            {" "}
            "Refocus Open Workspace - (workspacename)"
          </span>{" "}
        </div>
      </div>
    </Layout>
  );
}
