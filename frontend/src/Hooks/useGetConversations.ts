import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export interface IConversation {
  _id: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  username: string;
}

function useGetConversations() {
  const [loading, setLoading] = useState(false);

  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
      } catch (error) {
        toast(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
}

export default useGetConversations;
