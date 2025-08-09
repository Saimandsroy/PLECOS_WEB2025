// lib/auth.js
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import axios from 'axios'

// ... existing code ...

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          const response = await authApi.post('/login', {
            email: credentials?.email,
            password: credentials?.password,
          })
          
          const data = response.data
          
          return {
            user: data.user,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
            accessTokenExpires: data.accessTokenExpires,
          }
        } catch (error) {
          console.error("Authorization error:", error.response?.data || error.message)
          return null
        }
      },
    }),
  ],
  session: { 
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    // ... existing callbacks ...
  },
  pages: {
    signIn: '/sign-in',    // Updated to match your route
    signUp: '/sign-up',    // Updated to match your route
  },
})
