"use client";

import { ReactNode, useEffect } from "react";
import { useUserStore, UserSchema } from "@/entities/user";
import { baseURL } from "@/shared/api/config";

type UserProviderProps = {
  children: ReactNode;
};

/* Провайдер для получения информации о текущем пользователе из API */
export function UserProvider({ children }: UserProviderProps) {
  const setUser = useUserStore((s) => s.setUser);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await fetch(`${baseURL}/user/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        const parsedUser = UserSchema.safeParse(data);

        if (!parsedUser.success) {
          setUser(null);
          return;
        }

        setUser(parsedUser.data);
      } catch {
        setUser(null);
      }
    };
    loadCurrentUser();
  }, [setUser]);

  return children;
}
