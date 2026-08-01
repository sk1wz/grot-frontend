"use client";

import { ReactNode, useRef } from "react";
import { useUserStore, type UserType } from "@/entities/user";

type UserProviderProps = {
  children: ReactNode;
  initialUser: UserType | null;
};

export function UserProvider({ children, initialUser }: UserProviderProps) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useUserStore.setState({ user: initialUser });
    initialized.current = true;
  }

  return children;
}
