import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASS,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // 🔹 Se for logout, redireciona para a página inicial
      if (url.includes("signout")) {
        return `${baseUrl}/`;
      }
      // 🔹 Se for login, redireciona para o dashboard
      if (url.includes("signin")) {
        return `${baseUrl}/dashboard/content`;
      }
      // 🔹 Para outros casos, mantém o comportamento padrão
      return url.startsWith(baseUrl) ? url : `${baseUrl}/dashboard/content`;
    },
  },

  // Add debug mode for development
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
