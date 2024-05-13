const express = require("express");
const { PrismaClient } = require("@prisma/client");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const port = 8080;

// Middleware to parse JSON request body
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

const prisma = new PrismaClient();

// Object to store tab data
let tabData = {};
// Variables to store autoClose and time
let autoClose = true;
let time = 10;

// Create HTTP server
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on("connection", (ws) => {
  // Send tab data to clients on connection
  ws.send(JSON.stringify(tabData));

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Route to receive data from Chrome extension
app.post("/extension-data", (req, res) => {
  const { newAutoClose, newTime } = req.body;
  console.log("Received new settings from client:", { newAutoClose, newTime });

  // Update the variables with the new values
  autoClose = newAutoClose;
  time = newTime;

  // Send data to React client using WebSocket or HTTP request
  // For simplicity, let's assume you're sending it to the client via HTTP
  // Replace the URL with the appropriate endpoint of your React client
});

// Endpoint to receive tab data
app.post("/tab-data", (req, res) => {
  tabData = req.body;

  // Broadcast tab data to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(tabData));
    }
  });

  res.status(200).send("Tab data received successfully");
});

// Route to get autoClose and time
app.get("/extension-data", (req, res) => {
  // Send autoClose and time as response
  res.status(200).json({ autoClose, time });
});

app.get("/workspace-tabs", async (req, res) => {
  try {
    // Fetch all tabs from the workspace table using Prisma
    const tabs = await prisma.workspace.findMany({
      include: { tabs: true },
    });
    res.status(200).json(tabs);
  } catch (error) {
    console.error("Error fetching tabs from workspace:", error);
    res.status(500).json({
      error: "An error occurred while fetching tabs from the workspace.",
    });
  }
});

// WebSocket event to send updates whenever changes occur in the database
prisma.$on("workspace", async (event) => {
  // Fetch updated workspace data from the database
  const updatedWorkspaces = await prisma.workspace.findMany({
    include: { tabs: true },
  });

  // Send updated workspace data to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(updatedWorkspaces));
    }
  });
});

// Server-side Endpoint Logic
// Endpoint to create a new workspace
app.post("/workspaces", async (req, res) => {
  const { name, selectedTabs, userId } = req.body;

  try {
    // Save workspace data to the database using Prisma
    const createdWorkspace = await prisma.workspace.create({
      data: {
        name,
        tabs: {
          createMany: {
            data: selectedTabs.map((tab) => ({
              title: tab.title,
              url: tab.url,
              image: tab.image,
            })),
          },
        },
        // Associate the workspace with the user using the userId from the database
        user: { connect: { email: userId } },
      },
    });

    // Send WebSocket message to notify clients about the new workspace
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ type: "new_workspace", data: createdWorkspace })
        );
      }
    });

    console.log("Workspace saved to database:", createdWorkspace);
    res.status(201).json(createdWorkspace);
  } catch (error) {
    console.error("Error saving workspace to database:", error);
    res.status(500).json({
      error: "An error occurred while saving workspace to the database.",
    });
  }
});

// Endpoint to receive workspace data
app.post("/workspace-data", async (req, res) => {
  const { Wname, selectedTabs, userId } = req.body;

  try {
    // Save workspace data to the database using Prisma
    const createdWorkspace = await prisma.workspace.create({
      data: {
        name: Wname,
        tabs: {
          createMany: {
            data: selectedTabs.map((tab) => ({
              title: tab.title,
              url: tab.url,
              image: tab.image,
            })),
          },
        },
        // Connect the workspace to the user using the userId
        user: { connect: { email: userId } }, // Assuming userId is the email
      },
    });

    // Send WebSocket message to notify clients about the new workspace
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ type: "new_workspace", data: createdWorkspace })
        );
      }
    });

    console.log("Workspace saved to database:", createdWorkspace);
    res.status(201).json(createdWorkspace);
  } catch (error) {
    console.error("Error saving workspace to database:", error);
    res.status(500).json({
      error: "An error occurred while saving workspace to the database.",
    });
  }
});

// Endpoint to delete a workspace
app.delete("/workspaces/:workspaceId", async (req, res) => {
  const { workspaceId } = req.params;
  try {
    // Delete tabs associated with the workspace
    await prisma.tab.deleteMany({
      where: {
        workspaceId: parseInt(workspaceId),
      },
    });

    // Then delete the workspace
    await prisma.workspace.delete({
      where: {
        id: parseInt(workspaceId),
      },
    });

    // Send WebSocket message to notify clients about the deleted workspace
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "deleted_workspace",
            data: { id: parseInt(workspaceId) },
          })
        );
      }
    });

    res.status(200).send("Workspace deleted successfully");
  } catch (error) {
    console.error("Error deleting workspace:", error);
    res.status(500).json({ error: "Error deleting workspace" });
  }
});

// Start the HTTP server
server.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
