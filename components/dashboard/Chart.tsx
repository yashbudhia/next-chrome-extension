"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Chart from "chart.js/auto";

// Function to format seconds into hh:mm:ss format
const formatTime = (seconds: number) => {
  seconds = Math.floor(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours.toString().padStart(2, "0")} hours ${minutes.toString().padStart(2, "0")} minutes ${remainingSeconds.toString().padStart(2, "0")} seconds`;
};

const randomColor = (() => {
  "use strict";
  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return () => {
    var h = randomInt(0, 360);
    var s = randomInt(42, 98);
    var l = randomInt(40, 90);
    return `hsl(${h},${s}%,${l}%)`;
  };
})();

export default function ChartComponent(): JSX.Element {
  const [tabDataHistory, setTabDataHistory] = useState({});
  const [totalBrowserTimeSpent, setTotalBrowserTimeSpent] = useState(0);
  const [formattedTotalBrowserTime, setFormattedTotalBrowserTime] = useState(
    formatTime(0)
  );
  const chartRef = useRef<Chart | null>(null);
  const backgroundColorsRef = useRef<string[]>([]);

  const fetchTabData = useCallback(() => {
    chrome.runtime.sendMessage(
      "lgcppbhmkjaanapiifdjaindpcllghmf",
      { action: "getTabDataHistory" },
      (response) => {
        const { data } = response;
        console.log("Received tab data history:", data);
        // Update state only if there are changes in the data
        if (
          data &&
          JSON.stringify(data.tabDataHistory) !== JSON.stringify(tabDataHistory)
        ) {
          const {
            tabDataHistory: newTabDataHistory,
            totalBrowserTimeSpent: newTotalBrowserTimeSpent,
          } = data;
          setTabDataHistory(newTabDataHistory || {});
          setTotalBrowserTimeSpent(newTotalBrowserTimeSpent || 0);
          setFormattedTotalBrowserTime(formatTime(newTotalBrowserTimeSpent));
        }
      }
    );
  }, [tabDataHistory]);

  useEffect(() => {
    // Generate random colors initially
    backgroundColorsRef.current = generateRandomColors();

    // Fetch tab data and total browser time spent initially
    fetchTabData();

    // Schedule a periodic update every second
    const intervalId = setInterval(fetchTabData, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [fetchTabData]);

  const renderPieChart = useCallback((tabDataHistory) => {
    // Create an object to store total time spent on each domain
    const domainTimeMap = {};
    let totalBrowserTime = 0;
    Object.values(tabDataHistory).forEach((tab: any) => {
      // Check if tab.url is a valid string
      if (typeof tab.url === "string" && tab.url !== "") {
        // Extract domain name from the URL
        const domain = new URL(tab.url).hostname.replace("www.", "");
        // Add total time spent on this domain to the domainTimeMap
        domainTimeMap[domain] =
          (domainTimeMap[domain] || 0) + tab.totalTimeSpent;
        totalBrowserTime += tab.totalTimeSpent;
      }
    });

    // Extract unique domain names and their corresponding total time spent
    const domains = Object.keys(domainTimeMap);
    const totalSeconds = Object.values(domainTimeMap).reduce(
      (acc, time) => acc + time,
      0
    );
    const percentageTimeSpent = Object.values(domainTimeMap).map(
      (time) => (time / totalBrowserTime) * 100 // Use totalBrowserTime instead of totalSeconds
    );

    // Update chart data
    if (chartRef.current) {
      chartRef.current.data.labels = domains.map(
        (domain, index) =>
          `${domain} (${formatTime(domainTimeMap[domain])}) - ${percentageTimeSpent[index].toFixed(2)}%`
      );
      chartRef.current.data.datasets[0].data = percentageTimeSpent; // Update with percentage data
      chartRef.current.update();
    } else {
      // Create new Chart.js instance
      const ctx = document.getElementById("pieChart");
      if (ctx) {
        chartRef.current = new Chart(ctx, {
          type: "pie",
          data: {
            labels: domains.map(
              (domain, index) =>
                `${domain} (${formatTime(domainTimeMap[domain])}) - ${percentageTimeSpent[index].toFixed(2)}%`
            ),
            datasets: [
              {
                label: "Time Spent (%)", // Update label to indicate percentage
                data: percentageTimeSpent,
                backgroundColor: backgroundColorsRef.current,
              },
            ],
          },
          options: {
            animation: false, // Turn off animation
          },
        });
      }
    }

    // Update total browser time spent
    setTotalBrowserTimeSpent(totalBrowserTime);
    setFormattedTotalBrowserTime(formatTime(totalBrowserTime));
  }, []);

  useEffect(() => {
    // Render pie chart when tabDataHistory updates
    if (Object.keys(tabDataHistory).length > 0) {
      renderPieChart(tabDataHistory);
    }
  }, [renderPieChart, tabDataHistory]);

  const generateRandomColors = () => {
    const colors = [];
    for (let i = 0; i < 100; i++) {
      colors.push(randomColor());
    }
    return colors;
  };

  return (
    <div>
      <h1>Chart</h1>
      <p>
        Total Browser Time Spent:{" "}
        {`${Math.floor(totalBrowserTimeSpent / 3600)
          .toString()
          .padStart(2, "0")} hours ${Math.floor(
          (totalBrowserTimeSpent % 3600) / 60
        )
          .toString()
          .padStart(2, "0")} minutes`}
      </p>

      <div className="w-[600px] h-[600px]">
        <canvas id="pieChart" width="400" height="400"></canvas>
      </div>
    </div>
  );
}
