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

//Feedback form route
app.post("/feedback", async (req, res) => {
  try {
    const { userId, name, age, occupation, review, feedback } = req.body;

    // Save data to Prisma
    await prisma.feedback.create({
      data: {
        userId,
        name,
        age: parseInt(age, 10), // Convert age to number
        occupation,
        review,
        feedback,
      },
    });

    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while submitting feedback" });
  }
});

app.post("/extension-data", (req, res) => {
  const { newAutoClose, newTime } = req.body;
  autoClose = newAutoClose;
  time = newTime;
  res.status(200).send("Extension data updated successfully");
});

app.post("/tab-data", (req, res) => {
  tabData = req.body;
  res.status(200).send("Tab data received successfully");
});

app.get("/tab-data", (req, res) => {
  res.status(200).json(tabData);
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

app.post("/workspaces", async (req, res) => {
  const { name, selectedTabs, userId } = req.body;

  try {
    const createdWorkspace = await prisma.workspace.create({
      data: {
        name: Wname,
        tabs: {
          createMany: {
            data: selectedTabs.map((tab) => ({
              title: tab.title,
              url: tab.url,
              image: tab.image || null,
            })),
          },
        },
        user: { connect: { email: userId } },
      },
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

  if (
    !Wname ||
    !Array.isArray(selectedTabs) ||
    selectedTabs.length === 0 ||
    !userId
  ) {
    return res.status(400).json({ error: "Invalid request data" });
  }

  const validTabs = selectedTabs.filter((tab) => tab && tab.title && tab.url);

  if (validTabs.length === 0) {
    return res.status(400).json({ error: "No valid tabs provided" });
  }

  try {
    // Create workspace with optional image handling
    const createdWorkspace = await prisma.workspace.create({
      data: {
        name: Wname,
        tabs: {
          createMany: {
            data: selectedTabs.map((tab) => ({
              title: tab.title,
              url: tab.url,
              image: tab.image || null, // Set to null if image is undefined
            })),
          },
        },
        user: { connect: { email: userId } },
      },
    });

    res.status(201).json(createdWorkspace);
  } catch (error) {
    // Enhanced error handling
    if (error.clientVersion) {
      // Prisma-specific error
      console.error("Prisma Error saving workspace:", error);
      res.status(500).json({
        error:
          "An error occurred while saving the workspace. Please try again later.",
      });
    } else {
      // Other errors
      console.error("Unexpected error saving workspace:", error);
      res.status(500).json({
        error: "An unexpected error occurred. Please contact support.",
      });
    }
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

    res.status(200).send("Workspace deleted successfully");
  } catch (error) {
    console.error("Error deleting workspace:", error);
    res.status(500).json({ error: "Error deleting workspace" });
  }
});

server.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});
