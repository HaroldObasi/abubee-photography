const express = require("express");
const { paginatedResults } = require("../controllers/globalControllers");
const route = express.Router();
const Message = require("../models/messages");

const {
  sendMessage,
  getMessages,
  getMessageById,
} = require("../controllers/messageControllers");

route.post("/sendmessage", sendMessage);

route.get("/getmessages", getMessages);

route.get("/:id", getMessageById);

module.exports = route;
