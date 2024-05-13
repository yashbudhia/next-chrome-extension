import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const WorkspaceTabs = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [hoveredWorkspace, setHoveredWorkspace] = useState(null);

  const fetchWorkspaces = async () => {
    try {
      const response = await axios.get("http://localhost:8080/workspace-tabs");
      setWorkspaces(response.data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const deleteWorkspace = async (workspaceId) => {
    try {
      await axios.delete(`http://localhost:8080/workspaces/${workspaceId}`);
      fetchWorkspaces(); // Fetch workspaces again to update the UI
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  const truncateTitle = (title) => {
    if (title.length > 30) {
      return title.substring(0, 30) + "...";
    }
    return title;
  };

  const openWorkspace = (urls) => {
    chrome.runtime.sendMessage("lgcppbhmkjaanapiifdjaindpcllghmf", {
      action: "openWorkspace",
      data: urls,
    });
  };

  return (
    <div className="p-4">
      <h2>Workspace Tabs</h2>
      <div className="grid grid-cols-4 gap-4">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="workspace overflow-hidden"
            onMouseEnter={() => setHoveredWorkspace(workspace.id)}
            onMouseLeave={() => setHoveredWorkspace(null)}
            onClick={() => openWorkspace(workspace.tabs.map((tab) => tab.url))}
          >
            <motion.div
              whileTap={{ scale: 0.8 }}
              whileHover={{
                transition: { duration: 1 },
              }}
              className="border rounded-xl p-2 flex flex-col h-52"
            >
              <div className="text-heading pb-2">
                Workspace Name:{" "}
                <span className="text-green-500">{workspace.name}</span>
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto">
                {workspace.tabs &&
                  workspace.tabs.slice(0, 3).map((tab, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between overflow-hidden"
                    >
                      <div className="flex gap-2 pb-2">
                        <img
                          src={tab.image || "/chrome.svg"}
                          alt="Tab Image"
                          height={25}
                          width={30}
                        />
                        {truncateTitle(tab.title)}
                      </div>
                    </div>
                  ))}
                {workspace.tabs && workspace.tabs.length > 3 && (
                  <div className="text-sm text-gray-500">
                    {workspace.tabs.length - 3} more tab(s) hidden
                  </div>
                )}
              </div>
              <div className="mt-auto">
                <button
                  onClick={() => {
                    deleteWorkspace(workspace.id);
                    window.location.reload();
                  }}
                  className="text-red-500 hover:text-red-700 mr-2 "
                >
                  Delete Workspace
                </button>
                <button
                  onClick={() => {
                    openWorkspace(workspace.tabs.map((tab) => tab.url));
                    window.location.reload();
                  }}
                  className={`pl-12 text-white ${
                    hoveredWorkspace === workspace.id
                      ? "text-gray-400"
                      : "hover:text-green-500"
                  }`}
                >
                  Open workspace
                </button>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceTabs;
