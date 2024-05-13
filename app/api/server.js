import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Server as WebSocketServer } from "ws";
import { PrismaClient } from "@prisma/client";

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

// Create WebSocket server
const wss = new WebSocketServer({ noServer: true });

// WebSocket connection handler
wss.on("connection", (ws) => {
  // Send tab data to clients on connection
  ws.send(JSON.stringify(tabData));

  // Handle errors
  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

// Upgrade HTTP server to support WebSocket
const server = app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit("connection", ws, request);
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
    if (client.readyState === WebSocketServer.OPEN) {
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

// Endpoint to handle database operations
// Example: Fetching workspace tabs
app.get("/workspace-tabs", async (req, res) => {
  try {
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
  const updatedWorkspaces = await prisma.workspace.findMany({
    include: { tabs: true },
  });

  // Send updated workspace data to all connected clients
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocketServer.OPEN) {
      client.send(JSON.stringify(updatedWorkspaces));
    }
  });
});

// Additional endpoints for handling workspace data
// These endpoints can handle create, update, and delete operations

export default app;
