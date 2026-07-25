import z from "zod";

export type UserStore = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

export enum UserRole {
  ADMIN = "ADMIN",
  REGULAR = "REGULAR",
}

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.string(),
  role: z.enum(UserRole),
  picture: z.string(),
  balance: z.coerce.number(),
  createdAt: z.string(),
});

export type UserType = z.infer<typeof UserSchema>;
