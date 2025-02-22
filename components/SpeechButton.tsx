import React, { useState } from "react";
import axios from "axios";
import { Workspace } from "@/types";

const SpeechRecognitionButton = () => {
  const [voiceModeOn, setVoiceModeOn] = useState(false);
  const baseUrl = process.env.EXPRESS_URL || "https://api.refocus.co.in";
  const startSpeechRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";

    recognition.onresult = async (event) => {
      const command = event.results[0][0].transcript.trim().toLowerCase();
      console.log("Command:", command);

      if (command.startsWith("open workspace")) {
        const workspaceName = command.substring(14).trim();
        const workspaces = await fetchWorkspaces(); // Fetch workspaces
        const workspace = findWorkspaceByName(workspaces, workspaceName);
        if (workspace) {
          openWorkspace(workspace.tabs.map((tab: { url: string }) => tab.url));
        } else {
          console.log("Workspace not found");
        }
      }
    };

    recognition.start();
  };

  const fetchWorkspaces = async (): Promise<Workspace[]> => {
    try {
      const response = await axios.get<Workspace[]>(
        `${baseUrl}/workspace-tabs`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      return [];
    }
  };

  const findWorkspaceByName = (
    workspaces: Workspace[],
    workspaceName: string
  ): Workspace | undefined => {
    return workspaces.find((ws) =>
      ws.name.toLowerCase().includes(workspaceName.toLowerCase())
    );
  };

  const openWorkspace = (urls: string[]) => {
    chrome.runtime.sendMessage("lgcppbhmkjaanapiifdjaindpcllghmf", {
      action: "openWorkspace",
      data: urls,
    });
  };

  const handleSliderChange = () => {
    setVoiceModeOn(!voiceModeOn);
    if (!voiceModeOn) {
      startSpeechRecognition();
    }
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={voiceModeOn}
        onChange={handleSliderChange}
        className="sr-only peer"
      />
      <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
        Voice Mode
      </span>
    </label>
  );
};

export default SpeechRecognitionButton;
