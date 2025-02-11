import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { prisma } from "./lib/prisma";
import bcripjs from "bcryptjs";

const restrictedRoutes = ["/checkout", "/profile"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isRestricted = restrictedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );

      // Si la ruta es restringida
      if (isRestricted) {
        if (isLoggedIn) {
          return true; 
        }
        const loginUrl = new URL("/auth/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", nextUrl.pathname); 
        return Response.redirect(loginUrl);
      }

      
      if (isLoggedIn && nextUrl.pathname === "/auth/login") {
        return Response.redirect(new URL("/", nextUrl)); 
      }

      return true; 
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.data = user;
      }

      return token;
    },

    session: async ({ session, token, user }) => {
      session.user = token.data as any;

      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        //buscar el usuario por correo

        const user = await prisma.user.findUnique({
          where: {
            email: email.toLocaleLowerCase(),
          },
        });

        if (!user) return null;

        if (!bcripjs.compareSync(password, user.password)) return null;

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
});
