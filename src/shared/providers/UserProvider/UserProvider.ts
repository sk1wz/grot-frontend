"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore, UserSchema } from "@/entities/user";
import { baseURL } from "@/shared/api/config";
import { logout } from "@/features/auth/api";

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const response = await fetch(`${baseURL}/user/me`, {
          method: "GET",
          credentials: "include",
        });

        if (response.status === 401) {
          setUser(null);
          await logout();
          router.replace("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`Failed to load user: ${response.status}`);
        }

        const data: unknown = await response.json();
        const parsedUser = UserSchema.safeParse(data);

        if (!parsedUser.success) {
          setUser(null);
          return;
        }

        setUser(parsedUser.data);
      } catch (error) {
        console.error(error);
        setUser(null);
      }
    };

    void loadCurrentUser();
  }, [router, setUser]);

  return children;
}
