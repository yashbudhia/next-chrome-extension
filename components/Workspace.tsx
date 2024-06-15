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
      if (!data || !data.selectedTabs) {
        console.log("Data or selectedTabs is undefined");
        return;
      }
      const response = await axios.post(
        "https://api.refocus.co.in/workspace-data",
        {
          Wname: data.Wname,
          selectedTabs: data.selectedTabs,
          userId: userId, // Pass userId to server
        }
      );
      console.log("Saved workspace:", response.data);
      // Optionally, you can add a success message or trigger any necessary UI updates
    } catch (error) {
      console.error("Error saving workspace to database:", error);
      // Handle errors here, such as displaying an error message to the user
    }
  };

  // Render null as the Workspace component doesn't render any visible content
  return null;
};

export default Workspace;
