import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { client } from "./sanity/lib/client"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [GitHub],
  callbacks: {

    // triggered when a user attempts to sign in
    // destructure to avoid repetition 
    async signIn({
      user: {name, email, image}, 
      profile: {id, login, bio}
    }) {

      const existingUser = await client
        .withConfig({useCdn: false})
        .fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id})

      if (!existingUser) {
        await writeClient.create({
          // no specification if same name for key: value 
          _type: 'author',
          id,
          name,
          username: login,
          email,
          image,
          bio: bio || ''
        })

        return true
      }
    },

    // triggered whenever a new JSON Web Token (JWT) is created
    // connect github user to sanity author, carrying the sanity id
    // account by nextauth, profile by provider
    async jwt({token, account, profile}) {
      if (account && profile) {
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id})
        token.id = user?._id
      }
      return token;  
    },
    
    // runs whenever a session is checked or created
    async session({session, token, }) {
      Object.assign(session, {id: token.id})
      return session
    }
  }
})
