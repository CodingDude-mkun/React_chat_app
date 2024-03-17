/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const authUser = useAuthContext()?.setAuthUser;
  const login = async (username: string, password: string) => {
    const success = handleInputErrors(username, password);
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-app-user", data);
      console.log("setAuthUser from login");
      if (authUser) authUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
}

export default useLogin;

function handleInputErrors(username: string, password: string) {
  if (!username || !password) {
    toast.error("Plase fill all the fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 chars");
    return false;
  }

  return true;
}
