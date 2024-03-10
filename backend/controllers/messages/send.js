import Conversation from "../../models/conversation.modal.js";
import Message from "../../models/message.model.js";

async function sendMessage(req, res) {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let conv = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conv) {
      conv = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conv.messages.push(newMessage._id);
    }

    await Promise.all([newMessage.save(), conv.save()]);

    res.status(201).json(newMessage);
  } catch (err) {
    console.log("error on sendmessage: ", err);
    res.send(500, { error: err });
  }
}

export default sendMessage;
