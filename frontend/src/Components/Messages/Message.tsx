import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";

export interface IMessage {
  _id: string;
  createdAt: string;
  message: string;
  receiverId: string;
  senderId: string;
  updatedAt: string;
}

interface props {
  message: IMessage;
}

function Message({ message }: props) {
  console.log("messages in Message", message);

  const authUser = useAuthContext()?.authUser;
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser?._id;

  console.log("selectedConversation", selectedConversation);

  console.log("authUser.profilePic", authUser.profilePic);
  console.log(
    "selectedConversation.profilePic",
    selectedConversation.profilePic
  );
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const chatBubble = fromMe ? "bg-blue-700" : "";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation.profilePic;
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Profile Pic" src={profilePic} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${chatBubble}`}>
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {extractTime(message.createdAt)}
      </div>
    </div>
  );
}

export default Message;
