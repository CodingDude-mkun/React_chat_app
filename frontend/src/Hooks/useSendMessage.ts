import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast, { Toaster } from "react-hot-toast";
import useGetConversations from "./useGetConversations";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);

    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log("Data is");
      if (data.error) throw new Error(data.error);
      console.log("Message Sent");
      setMessages([...messages, data]);
    } catch (error) {
      toast(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
