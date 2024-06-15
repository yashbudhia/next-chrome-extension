import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import Workspace from "./Workspace";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import useWebSocket from "./UseWebSocket";

export interface FormData {
  Wname: string;
  selectedTabs: string[]; // Array of selected tabIds
}

export const FormSchema = z.object({
  Wname: z
    .string()
    .min(1, { message: "Name of workspace must be at least 1 character" }),
  selectedTabs: z.array(z.string()), // Array of tabIds
});

interface TabData {
  [tabId: string]: {
    title: string;
    url: string;
    image: string;
  };
}

const TabDataComponent = () => {
  const { data: session, status } = useSession();
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false); // State to track button disabled state
  const [ws, setWs] = useState<WebSocket | null>(null); // WebSocket instance
  const initialTabData = useWebSocket("wss://api.refocus.co.in"); // Or ws://...
  const [tabData, setTabData] = useState<TabData>(initialTabData || {});
  const [workspaceData, setWorkspaceData] = useState<FormData | null>(null); // State to store workspace data

  const express_url = process.env.EXPRESS_URL || "https://api.refocus.co.in";

  const baseUrl = "wss://api.refocus.co.in"; // Development environment

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Function to set form values
    watch, // Function to watch form values
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Wname: "",
      selectedTabs: [], // Initialize selectedTabs as an empty array
    },
  });

  const selectedTabs = watch("selectedTabs");

  useEffect(() => {
    const ws = new WebSocket(baseUrl);
    setWs(ws);

    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened");
    });

    ws.addEventListener("message", (event) => {
      try {
        const receivedData = JSON.parse(event.data);

        // Update tabData to include new tabs and REMOVE closed tabs
        setTabData((prevTabData) => {
          const newTabData = { ...prevTabData };
          for (const tabId in receivedData) {
            newTabData[tabId] = receivedData[tabId];
          }

          // Remove tabs that are no longer present in the received data
          for (const tabId in prevTabData) {
            if (!(tabId in receivedData)) {
              delete newTabData[tabId];
            }
          }

          return newTabData;
        });
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    });

    ws.addEventListener("close", () => {
      console.log("WebSocket connection closed");
    });

    ws.addEventListener("error", (error) => {
      console.error("WebSocket error:", error);
    });

    return () => {
      ws.close();
    };
  }, [baseUrl]); // Only re-run this effect if baseUrl changes

  const onSubmit = async (data: FormData) => {
    const workspaceData = {
      Wname: data.Wname,
      selectedTabs: data.selectedTabs.map((tabId) => ({
        title: tabData[tabId].title || "",
        url: tabData[tabId].url || "",
        image: tabData[tabId].image || "",
      })),
    };

    toast({
      variant: "default",
      title: "New workspace created:",
      description: `${data.Wname} is added to the workspace section`,
    });

    if (ws) {
      console.log("Sending workspaceData via WebSocket:", workspaceData);
      ws.send(JSON.stringify(workspaceData));
    }

    setWorkspaceData(workspaceData as any);
    window.location.reload();
  };

  return (
    <div className="flex flex-col gap-2 p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 pt-4 items-center">
          <div className="text-heading">Enter Workspace Name:</div>
          <input
            className="w-80 rounded-lg h-10 bg-black p-2 text-base border-2 border-green-600 focus:border-purple-500"
            placeholder="Workspace name"
            {...register("Wname", { required: true })}
          />
          {errors.Wname && (
            <span className="error-message">Workspace name is required</span>
          )}
        </div>
        <br />
        <div className="text-heading">
          Open the Tabs you want to add to the Workspace:
        </div>
        <div className="pt-2 gap-3">
          {tabData &&
            Object.keys(tabData).map((tabId) => {
              const tab = tabData[tabId];
              if (!tab) {
                return null;
              }
              return (
                <div key={tabId} className="flex gap-2 pt-2">
                  <input
                    type="checkbox"
                    id={tabId}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      if (isChecked) {
                        setValue("selectedTabs", [...selectedTabs, tabId]);
                      } else {
                        setValue(
                          "selectedTabs",
                          selectedTabs.filter((id) => id !== tabId)
                        );
                      }
                    }}
                    className="accent-green p-3 border rounded size-6"
                  />
                  <div>
                    <img
                      src={tab.image || "/chrome.svg"}
                      width={24}
                      height={24}
                      alt="tab-image"
                    />
                  </div>
                  <label htmlFor={tabId}>{tab.title}</label>
                </div>
              );
            })}
        </div>
        {errors.selectedTabs && (
          <span className="error-message">At least one tab is required</span>
        )}
        <div className="pt-4">
          <button
            className="p-[3px] relative"
            type="submit"
            disabled={isCreating} // Disable the button when isCreating is true
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-500 rounded-lg" />
            <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white text-heading hover:bg-transparent">
              Create
            </div>
          </button>
        </div>
      </form>

      {/* Render Workspace component only when workspaceData is available */}
      {workspaceData && session?.user && tabData && (
        <Workspace
          data={{
            ...workspaceData,
            selectedTabs: selectedTabs.map((tabId) => tabData[tabId]),
          }}
          userId={session?.user?.email || ""}
        />
      )}
    </div>
  );
};

export default TabDataComponent;
