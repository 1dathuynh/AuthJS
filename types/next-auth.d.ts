import { UserRole } from "@prisma/client";
import { DefaultSession, Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    role: string;
    isTwoFactorEnabled: boolean,
    email: string
    isOAuth: boolean

  }

  interface User {
    id: string;
    role: string;
    isTwoFactorEnabled: boolean
    isOAuth: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isTwoFactorEnabled: boolean
    role: string;

  }
}
export type ExtenededUser = DefaultSession['user'] & {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  emailVerified: Date | null;
  password: string | null;
  role: "ADMIN" | "USER";
  isTwoFactorEnabled: boolean;

}