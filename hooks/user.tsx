"use client";
import { createContext, useContext, useState } from "react";
import { ProtectedUser } from "@/lib/types";
import { cookies } from "next/headers";
import { log } from "console";

interface UserState {
  user: ProtectedUser | null;
  setUser: React.Dispatch<React.SetStateAction<ProtectedUser | null>>;
}

const UserContext = createContext<ProtectedUser | undefined>(undefined);

export const UserProvider: React.FC<{
  children: React.ReactNode;
  user: ProtectedUser;
}> = ({ children, user }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
