import React, { useEffect, useRef } from "react";
import Message, { IMessage } from "./Message";
import useGetMessages from "../../Hooks/useGetMessages";
import MessageSkeleton from "../Skeletons/MessageSkeleton";

function Messages() {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current)
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message: IMessage) => {
          return (
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message}></Message>
            </div>
          );
        })}

      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading && messages.length === 0 && (
        <p className="text-center"> Send A message to start conversation</p>
      )}
    </div>
  );
}

export default Messages;
