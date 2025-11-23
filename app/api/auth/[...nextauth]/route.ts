import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import {prisma} from "@/app/lib/prisma"
import bcrypt from "bcrypt"

let baseUrl = process.env.BASE_URL;
const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    Credentials({
      name: "email",
      credentials:{
        email: {label:"Email", type:"text", placeholder:"xyz"},
        password: {label: "Password", type: "password"}
      },

      async authorize(credentials){
        
        if(credentials){
          const user = await prisma.user.findFirst({
                where: {
                    email:credentials.email
                }
            });

            if(user){
              const passMatch = await bcrypt.compare(credentials.password,user.password);
              if(passMatch){
                return user
              }
            }
            return null;
        }
      }
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages:{
    signIn: "/auth/signin"
  },
  callbacks: {
      async redirect({ url, baseUrl }) {
        return baseUrl;
      }
    }
})

export {handler as GET,handler as POST }