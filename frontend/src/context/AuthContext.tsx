import { createContext, useContext, useState } from "react";
import { userAuthContext } from "../Interfaces/user.interface";

export const AuthContext = createContext<userAuthContext | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthContextProvider = ({ children }: any) => {
  const userInLocal = localStorage.getItem("chat-app-user");
  console.log("userInLocal", userInLocal);
  const [authUser, setAuthUser] = useState(userInLocal);
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
