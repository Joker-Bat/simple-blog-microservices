// Service for create and process comments

const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  return res.status(200).send(commentsByPostId[req.params.id]);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  try {
    const comment = commentsByPostId[req.params.id] || [];
    comment.push({ id: commentId, content, status: "pending" });

    commentsByPostId[req.params.id] = comment;

    await axios.post("http://localhost:4005/events", {
      type: "CommentCreated",
      data: {
        id: commentId,
        postId: req.params.id,
        content,
        status: "pending",
      },
    });

    res.status(201).send(commentsByPostId[req.params.id]);
  } catch (err) {
    console.log("Something went wrong: ", err);
    return res.status(400).send({ message: "Something went wrong" });
  }
});

// Receive events from event bus
app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  console.log("Received event from event bus: ", req.body.type);

  // When receive a comment moderated then send a comment updated signal to event bus so that query service gets updated for a latest changes
  if (type === "CommentModerated") {
    const updatedPost = {
      id: data.id,
      postId: data.postId,
      content: data.content,
      status: data.status,
    };
    commentsByPostId[data.id] = updatedPost;

    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: updatedPost,
    });
  }

  return res.status(200).json({});
});

app.listen(4001, () => {
  console.log("Comments service listening on port 4001");
});
