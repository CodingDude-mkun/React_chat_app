import React from "react";
import { IConversation } from "../../Hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

interface props {
  conversation: IConversation;
  lastIndex: boolean;
}

function Conversation({ conversation, lastIndex }: props) {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const onlineUsers = useSocketContext()?.onlineUsers;

  const isOnline = onlineUsers.includes(conversation._id);

  const isSelected = selectedConversation?._id === conversation._id;
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-700 rounded p-2 py-1 cursor-pointer 
      ${isSelected ? "bg-sky-500" : ""}`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-200">{`${conversation.firstName} ${conversation.lastName}`}</p>
            <span className="text-xl">🎉</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
}

export default Conversation;
