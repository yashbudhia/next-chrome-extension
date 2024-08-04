"use client";

import Layout from "@/app/dashboard/Layout";
import WorkspaceTabs from "@/components/FetchWorkspace";

import TabDataComponent from "@/components/TabData";
import { useEffect } from "react";

export default function Home() {
  // Fetch session data from NextAuth endpoint
  useEffect(() => {
    async function fetchSessionData() {
      try {
        const response = await fetch("/api/auth/session");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const sessionData = await response.json();
        if (sessionData && chrome.runtime && chrome.runtime.sendMessage) {
          // Send session data to the background script
          chrome.runtime.sendMessage("lgcppbhmkjaanapiifdjaindpcllghmf", {
            action: "setSession",
            session: sessionData,
          });
          console.log("Session data sent to background script:", sessionData);
        } else {
          console.log("No session data or chrome.runtime is unavailable.");
        }
      } catch (error) {
        console.error("Error fetching session data:", error);
      }
    }

    // Call the function to fetch and send session data
    fetchSessionData();
  }, []);

  return (
    <Layout>
      <WorkspaceTabs />
      <div className="flex flex-col ">
        <TabDataComponent />
      </div>
    </Layout>
  );
}
