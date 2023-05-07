"use-client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import useLocalStorage from "@/hooks/use-local-storage";
type UserContextType = [object | null, Dispatch<SetStateAction<object | null>>];

const UserContext = createContext<UserContextType>([null, () => {}]);

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
