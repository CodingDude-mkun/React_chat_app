import React from "react";
import Conversation from "./Conversation";
import useGetConversations, {
  IConversation,
} from "../../Hooks/useGetConversations";

function Conversations() {
  const { loading, conversations } = useGetConversations();
  const conv: IConversation[] = conversations;
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conv.map((conv, idx) => (
        <Conversation
          key={conv._id}
          conversation={conv}
          lastIndex={idx === conversations.length - 1}
        />
      ))}

      {loading ? <span className="loading loading-spinner"></span> : null}
    </div>
  );
}

export default Conversations;
