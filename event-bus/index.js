// Service for event bus between services

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  // Store all events to simulate the events sync for query service
  events.push(event);

  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log("Error on posts events: ", err.message);
  });

  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log("Error on comments events: ", err.message);
  });

  axios.post("http://localhost:4002/events", event).catch((err) => {
    console.log("Error on query servie: ", err.message);
  });

  axios.post("http://localhost:4003/events", event).catch((err) => {
    console.log("Error on moderation service: ", err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.status(200).send(events);
});

app.listen(4005, () => {
  console.log("Event bus listening on 4005");
});
