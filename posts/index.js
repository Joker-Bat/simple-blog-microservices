// Service for create and process posts

const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get("/posts", (req, res) => {
  return res.status(200).send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  try {
    posts[id] = { id, title };

    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: posts[id],
    });

    res.status(201).send(posts[id]);
  } catch (err) {
    console.log("Error when creating a post:", err);
    return res.status(400).send({ message: "Something went wrong" });
  }
});

// Receive events from event bus
app.post("/events", (req, res) => {
  console.log("Received event from event bus: ", req.body.type);

  return res.status(200).json({});
});

app.listen(4000, () => {
  console.log("Posts service running on port 4000");
});
