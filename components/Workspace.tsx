import React, { useEffect, useRef } from "react";
import axios from "axios";

interface WorkspaceProps {
  data: {
    Wname: string;
    selectedTabs: {
      title: string;
      url: string;
      image: string;
    }[];
  };
  userId: string; // Ensure userId is received as a prop
}

const Workspace: React.FC<WorkspaceProps> = ({ data, userId }) => {
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    if (data && !isMountedRef.current) {
      saveWorkspace();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [data]); // Only re-run effect if data changes

  const saveWorkspace = async () => {
    console.log("Saving workspace...");
    try {
      if (!data || !data.selectedTabs || data.selectedTabs.length === 0) {
        console.log("Invalid data or no tabs selected");
        return;
      }

      // Filter out invalid entries
      const validTabs = data.selectedTabs.filter(
        (tab) => tab && tab.title && tab.url
      );

      if (validTabs.length === 0) {
        console.log("No valid tabs to save");
        return;
      }

      const payload = {
        Wname: data.Wname,
        selectedTabs: validTabs,
        userId: userId,
      };

      console.log("Payload:", payload);

      const response = await axios.post(
        "https://api.refocus.co.in/workspace-data",
        payload
      );

      console.log("Saved workspace:", response.data);
      // Optionally, you can add a success message or trigger any necessary UI updates
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error message:", error.message);
        console.error("Axios error response:", error.response);
      } else {
        console.error("Unexpected error:", error);
      }
      // Handle errors here, such as displaying an error message to the user
    }
  };

  // Render null as the Workspace component doesn't render any visible content
  return null;
};

export default Workspace;
