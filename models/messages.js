const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
  },
  senderNum: {
    type: String,
  },
  body: {
    type: String,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  read: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Messages", messageSchema);
