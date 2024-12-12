
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
const prisma = new PrismaClient()

interface credentials {
    email:string,
    password:string
name:string
}
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: { label: "email", type: "email",placeholder: "johnbhai@gmail.com", required: true }, 
              name: { label: "name", type: "text",placeholder: "john bhai", required: true },
              password: { label: "password", type: "password", required: true }
            
            },
            // TODO: User credentials type from next-aut
            async authorize(credentials: credentials | undefined) {
              // Do zod validation, OTP validation here
              if(!credentials){
                  return null
              }
              const hashedPassword = await bcrypt.hash(credentials.password, 10);
              const existingUser = await prisma.user.findFirst({
                  where: {
                      email: credentials.email,
              
                  }
              });
          
              if (existingUser) {
                  const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                  if (passwordValidation) {
                      return {
                          id: existingUser.id.toString(),
                          name: existingUser.name,
                          email:existingUser.email,
                          password: existingUser.password
                      }
                  }
                  return null;
              }
          
              try {
                  const user = await prisma.user.create({
                      data: {
                          email: credentials.email,
                      name:credentials.name,
                          password: hashedPassword
                      }
                  });
              
                  return {
                      id: user.id.toString(),
          
                      email: user.email,
                      password:user.password
                  }
              } catch(e) {
                  console.error(e);
              }
          
              return null
            },
            })
          
    ],
    secret: process.env.JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  