import Conversation from "../../models/conversation.modal.js";

async function getMessages(req, res) {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conv = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    res.status(200).json(conv.messages);
  } catch (error) {
    res.send(500, error);
  }
}

export default getMessages;
