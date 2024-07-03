"use client"; // For client components in Next.js 13+

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const express_url = "https://api.refocus.co.in"; // Update with your actual API URL

function TabSelectionForm() {
  const [tabData, setTabData] = useState([]);
  const [selectedTabs, setSelectedTabs] = useState<string[]>([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTabData = async () => {
      try {
        const response = await axios.get(`${express_url}/tab-data`);
        setTabData(Object.values(response.data));
      } catch (error) {
        console.error("Error fetching tab data:", error);
      }
    };

    // Fetch initial data
    fetchTabData();

    // Poll for updates (adjust interval as needed)
    const intervalId = setInterval(fetchTabData, 100);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleCheckboxChange = (tabTitle: any) => {
    setSelectedTabs((prevSelected) =>
      prevSelected.includes(tabTitle)
        ? prevSelected.filter((title) => title !== tabTitle)
        : [...prevSelected, tabTitle]
    );
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const selectedTabDetails = tabData.filter((tab: any) =>
        selectedTabs.includes(tab.title)
      );

      if (!session || !session.user?.email) {
        console.error("User is not signed in");
        return;
      }

      await axios.post(`${express_url}/workspace-data`, {
        Wname: workspaceName,
        selectedTabs: selectedTabDetails,
        userId: session.user.email,
      });
      console.log("Workspace created successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="workspaceName">Workspace Name:</label>
          <input
            type="text"
            id="workspaceName"
            className="accent-green p-3 border rounded w-[300px] h-[30px] ml-4 "
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </div>
        <ul>
          {tabData.map((tab: any) => (
            <li key={tab.title}>
              <div className="gap-3 pb-2 flex items-center">
                <input
                  type="checkbox"
                  id={tab.title}
                  checked={selectedTabs.includes(tab.title)}
                  onChange={() => handleCheckboxChange(tab.title)}
                />

                <label htmlFor={tab.title} className="flex items-center">
                  <img
                    src={tab.image || "/chrome.svg"}
                    width={24}
                    height={24}
                    alt="tab-image"
                    className="mr-2" // Add right margin for spacing
                  />
                  <div>{tab.title}</div>
                </label>
              </div>
            </li>
          ))}
        </ul>
        <div className="pt-4">
          <button className="p-[3px] relative" type="submit">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white text-heading hover:bg-transparent">
              Create
            </div>
          </button>
        </div>
      </form>
    </div>
  );
}

export default TabSelectionForm;
