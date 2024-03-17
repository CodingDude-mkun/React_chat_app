import { useState } from "react";
import { signUpInputs } from "../Pages/signup/signup";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useSignup() {
  const [loading, setloading] = useState(false);
  const authUser = useAuthContext()?.setAuthUser;
  const signUpUser = async ({
    firstName,
    lastName,
    username,
    password,
    confirmPassword,
  }: signUpInputs) => {
    const success = handleInputErrors({
      firstName,
      lastName,
      username,
      password,
      confirmPassword,
    });

    if (!success) {
      return;
    }

    try {
      setloading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json ",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Localstorage
      localStorage.setItem("chat-app-user", JSON.stringify(data));
      // Set Context to check if logged in
      if (authUser) authUser(data);
    } catch (error) {
      console.log(error);
      toast.error("Some Error occurred");
    } finally {
      setloading(false);
    }
  };

  return { loading, signUpUser };
}

export default useSignup;

function handleInputErrors({
  firstName,
  lastName,
  username,
  password,
  confirmPassword,
}: signUpInputs) {
  if (!firstName || !lastName || !username || !password || !confirmPassword) {
    toast.error("Plase fill all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 chars");
    return false;
  }

  return true;
}
