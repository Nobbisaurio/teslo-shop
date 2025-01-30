import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from './lib/prisma';
import bcripjs from 'bcryptjs';


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        //buscar el usuario por correo

        const user  =await  prisma.user.findUnique({
          where: {
            email: email.toLocaleLowerCase()
          }
        })

        if(!user) return null;

        if(!bcripjs.compareSync(password, user.password)) return null;

        const {password:_, ...rest } = user;


        return rest;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
});
