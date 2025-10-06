import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { client } from "./src/sanity/client"
import bcrypt from 'bcryptjs'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Authorize function called with:", credentials);

        if (!credentials?.username || !credentials.password) {
          console.log("Missing credentials");
          return null
        }

        // 1. Fetch the admin user from Sanity
        const user = await client.fetch(
          `*[_type == "adminUser" && username == $username][0]`,
          { username: credentials.username }
        )
        console.log("User fetched from Sanity:", user);

        if (!user) {
          console.log("User not found in Sanity");
          return null // User not found
        }

        // 2. Compare the provided password with the stored hash
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        )
        console.log("Is password correct?", isPasswordCorrect);

        if (isPasswordCorrect) {
          // 3. Return user object if successful
          const finalUserObject = { id: user._id, name: user.username };
          console.log("Authentication successful, returning user:", finalUserObject);
          return finalUserObject;
        }
        
        console.log("Passwords do not match");
        return null // Passwords don't match
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // On sign-in, redirect to the admin dashboard
      return `${baseUrl}/blog`
    },
  },
})