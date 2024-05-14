"use client";
import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const [autoClose, setAutoClose] = useState(false);
  const [time, setTime] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Fetch data from server when component mounts
    fetch("http://localhost:8080/extension-data")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data from server");
        }
        return response.json();
      })
      .then((data) => {
        // Update state with data received from server
        setAutoClose(data.autoClose);
        setTime(data.time);
        console.log("Data received from server:", data);
      })
      .catch((error) => {
        console.error("Error fetching data from server:", error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleCheckboxChange = (event: {
    target: { checked: boolean | ((prevState: boolean) => boolean) };
  }) => {
    setAutoClose(event.target.checked);
  };

  const handleInputChange = (event: { target: { value: string } }) => {
    setTime(parseInt(event.target.value));
  };

  const sendValuesToBackground = () => {
    console.log("Sending values to background:", { autoClose, time }); // Log values before sending
    chrome.runtime.sendMessage(
      "lgcppbhmkjaanapiifdjaindpcllghmf",
      { action: "saveSettings", autoClose, time },
      (response) => {
        if (response && response.success) {
          console.log("Settings saved successfully");
          toast({
            variant: "default",
            title: "Settings Saved",
            description: `Your settings are saved successfully`,
          });
        } else {
          console.error("Failed to save settings");
        }
      }
    );
  };

  return (
    <Layout>
      <div className="p-4 font-semibold">
        <div className="text-xl">Settings</div>
        <div className="flex flex-col gap-3 text-lg pt-2">
          <div className="flex items-center">
            Automatically close inactive tabs after fixed time :
            <input
              type="checkbox"
              id="check"
              className="size-4 pl-4"
              checked={autoClose}
              onChange={handleCheckboxChange}
            />
          </div>
          <div>Time after which inactive tabs will be closed :</div>
          <div className="flex gap-2">
            <input
              type="number"
              id="time"
              className="size-6 w-16 border-2"
              value={time}
              onChange={handleInputChange}
            />
            <div>Minutes</div>
          </div>

          <button
            onClick={sendValuesToBackground}
            className="p-[3px] relative w-52"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              Save Settings
            </div>
          </button>
        </div>
      </div>
    </Layout>
  );
}
