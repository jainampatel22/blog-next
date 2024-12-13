import NextAuth, { NextAuthOptions } from "next-auth";
import { Session, DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name?: string;
    password?: string; // Do not include sensitive data in production
  }
}

interface Credentials {
  email: string;
  password: string;
  name: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "johnbhai@gmail.com", required: true },
        name: { label: "Name", type: "text", placeholder: "John Bhai", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials: Credentials | undefined) {
        if (!credentials || !credentials.email || !credentials.password) {
          return null; // Ensure credentials are valid
        }
      
        const { email, password, name } = credentials;
      
        const existingUser = await prisma.user.findFirst({
          where: { email }, // Safely passing email as a string
        });
      
        if (existingUser) {
          const isValidPassword = await bcrypt.compare(password, existingUser.password);
          if (isValidPassword) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }
      
        // Create a new user if it doesn't exist
        try {
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = await prisma.user.create({
            data: {
              email,
              name,
              password: hashedPassword,
            },
          });
      
          return {
            id: newUser.id.toString(),
            email: newUser.email,
          };
        } catch (error) {
          console.error("Error creating user:", error);
          return null;
        }
      }
      
      
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ token, session }: { token: JWT; session: Session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
