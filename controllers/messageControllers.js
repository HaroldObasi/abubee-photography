const Message = require("../models/messages");

const sendMessage = async (req, res) => {
  const newMessage = new Message({
    senderName: req.body.name,
    senderEmail: req.body.email,
    senderNum: req.body.num,
    body: req.body.body,
  });

  try {
    const message = await newMessage.save();
    res.send(message);
  } catch (err) {
    res.json(err);
  }
};

const getMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const count = await Message.countDocuments();

    const messages = await Message.find()
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    const result = {
      messages,
      page,
      pages: Math.ceil(count / pageSize),
    };
    res.status(200).json({ result });
  } catch (err) {
    res.json({ message: err });
  }
};

const getMessageById = async (req, res) => {
  const id = req.params.id;
  const msgItem = await Message.findById(id);

  try {
    res.send(msgItem);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  sendMessage,
  getMessages,
  getMessageById,
};
