import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Workspace } from "@/types";

const WorkspaceTabs = () => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [hoveredWorkspace, setHoveredWorkspace] = useState<string | null>(null);
  const baseUrl = "https://api.refocus.co.in";

  const fetchWorkspaces = async () => {
    try {
      const response = await axios.get<
        { id: string; name: string; tabs: any[] }[]
      >(`${baseUrl}/workspace-tabs`);
      setWorkspaces(
        response.data.map((workspace) => ({
          ...workspace,
          tabs: workspace.tabs || [],
        }))
      );
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const deleteWorkspace = async (
    workspaceId: any,
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevent event from bubbling up to parent
    try {
      await axios.delete(`${baseUrl}/workspaces/${workspaceId}`);
      fetchWorkspaces();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting workspace:", error);
    }
  };

  const truncateTitle = (title: string) => {
    if (title.length > 30) {
      return title.substring(0, 30) + "...";
    }
    return title;
  };

  const openWorkspace = (
    urls: any,
    event:
      | React.MouseEvent<HTMLDivElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevent event from bubbling up to parent
    chrome.runtime.sendMessage("lgcppbhmkjaanapiifdjaindpcllghmf", {
      action: "openWorkspace",
      data: urls,
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-heading">Available Workspaces : </h2>
      <div className="grid grid-cols-4 gap-4">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="workspace relative overflow-hidden"
            onMouseEnter={() => setHoveredWorkspace(workspace.id)}
            onMouseLeave={() => setHoveredWorkspace(null)}
          >
            <div className="border rounded-xl p-2 flex flex-col h-52">
              <div className="text-heading pb-2">
                Workspace Name:{" "}
                <span className="text-green-500">{workspace.name}</span>
              </div>
              <div className="flex flex-col gap-1 overflow-y-auto">
                {workspace.tabs &&
                  workspace.tabs
                    .slice(0, 3)
                    .map(
                      (
                        tab: { image: any; title: any },
                        index: React.Key | null | undefined
                      ) => (
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
                      )
                    )}
                {workspace.tabs && workspace.tabs.length > 3 && (
                  <div className="text-sm text-gray-500">
                    {workspace.tabs.length - 3} more tab(s) hidden
                  </div>
                )}
              </div>
              {/* Action Buttons */}
              <div className="mt-auto flex justify-between">
                <div className="relative">
                  <button
                    onClick={(e) => deleteWorkspace(workspace.id, e)}
                    className="text-red-500 hover:text-red-700 mr-2 relative z-10"
                  >
                    Delete Workspace
                  </button>
                </div>
                <button
                  onClick={(e) =>
                    openWorkspace(
                      workspace.tabs.map((tab: { url: any }) => tab.url),
                      e
                    )
                  }
                  className={`pl-12 text-white ${
                    hoveredWorkspace === workspace.id
                      ? "text-gray-400"
                      : "hover:text-green-500"
                  }`}
                >
                  Open workspace
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkspaceTabs;
