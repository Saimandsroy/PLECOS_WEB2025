// lib/auth.js
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import axios from "axios";

// Raw axios instance for server-side auth calls (no interceptors)
const authApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`,
  timeout: 10000,
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        try {
          const response = await authApi.post("/login", {
            email: credentials?.email,
            password: credentials?.password,
            role: credentials?.role,
          });
          const data = response.data.data;

          // Return user object with tokens attached (tokens will be moved to JWT in callback)
          if (data?.user) {
            return {
              id: data.user.id || data.user.email, // Ensure ID exists
              email: data.user.email,
              name: data.user.name,
              role: data.user.role,
              // Attach tokens temporarily to be moved into JWT
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              accessTokenExpires: data.accessTokenExpires,
            };
          }

          return null;
        } catch (error) {
          console.error(
            "Authorization error:",
            error.response?.data || error.message
          );
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // First sign-in: move tokens from user to token
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = user.accessTokenExpires;
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }

      // TODO: Add token refresh logic here if needed
      return token;
    },
    async session({ session, token }) {
      // Expose token values on session
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
    signUp: "/sign-up",
  },
});
