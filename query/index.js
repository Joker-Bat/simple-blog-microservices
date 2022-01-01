// Service for store the data as frontend need to reduce the request make from frontend

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvents = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    if (posts[postId]) {
      posts[postId].comments.push({ id, content, status });
    }
  }

  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    if (posts[postId]) {
      const comments = posts[postId].comments;
      const comment = comments.find((comment) => comment.id === id);
      comment.status = status;
      comment.content = content;
    }
  }
};

app.get("/posts", (req, res) => {
  res.status(200).json(posts);
});

app.post("/events", (req, res) => {
  console.log("Received event from event bus: ", req.body.type);

  const { type, data } = req.body;
  handleEvents(type, data);

  res.send("OK");
});

app.listen(4002, async () => {
  console.log("Query service running on port 4002");

  try {
    const { data } = await axios.get("http://localhost:4005/events");

    for (let event of data) {
      console.log("Processing data at initial: ", event.type);
      handleEvents(event.type, event.data);
    }
  } catch (err) {
    console.log("Error when fetching a initial data", err.message);
  }
});
