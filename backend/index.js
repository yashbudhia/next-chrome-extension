const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(cors());

const prisma = new PrismaClient();

let tabData = {};
let autoClose = true;
let time = 10;

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
  ws.send(JSON.stringify(tabData));

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

app.post("/extension-data", (req, res) => {
  const { newAutoClose, newTime } = req.body;
  autoClose = newAutoClose;
  time = newTime;
});

app.post("/tab-data", (req, res) => {
  tabData = req.body;
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(tabData));
    }
  });
  res.status(200).send("Tab data received successfully");
});

app.get("/extension-data", (req, res) => {
  res.status(200).json({ autoClose, time });
});

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

prisma.$on("workspace", async (event) => {
  const updatedWorkspaces = await prisma.workspace.findMany({
    include: { tabs: true },
  });

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(updatedWorkspaces));
    }
  });
});

app.post("/workspaces", async (req, res) => {
  const { name, selectedTabs, userId } = req.body;

  try {
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
        user: { connect: { email: userId } },
      },
    });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ type: "new_workspace", data: createdWorkspace })
        );
      }
    });

    res.status(201).json(createdWorkspace);
  } catch (error) {
    console.error("Error saving workspace to database:", error);
    res.status(500).json({
      error: "An error occurred while saving workspace to the database.",
    });
  }
});

app.post("/workspace-data", async (req, res) => {
  const { Wname, selectedTabs, userId } = req.body;

  try {
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
        user: { connect: { email: userId } },
      },
    });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ type: "new_workspace", data: createdWorkspace })
        );
      }
    });

    res.status(201).json(createdWorkspace);
  } catch (error) {
    console.error("Error saving workspace to database:", error);
    res.status(500).json({
      error: "An error occurred while saving workspace to the database.",
    });
  }
});

app.delete("/workspaces/:workspaceId", async (req, res) => {
  const { workspaceId } = req.params;
  try {
    await prisma.tab.deleteMany({
      where: {
        workspaceId: parseInt(workspaceId),
      },
    });

    await prisma.workspace.delete({
      where: {
        id: parseInt(workspaceId),
      },
    });

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

server.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
