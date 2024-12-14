// extend the default module types of the next-auth package
import NextAuth from "next-auth"
declare module "next-auth" {
    interface Session {
        id: string
    }

    interface JWT {
        id: string
    }
}