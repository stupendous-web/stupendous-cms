import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        return {
          id: 1,
          name: "J Smith",
          email: "topher@stupendousweb.com",
        };
      },
    }),
  ],
};
export default NextAuth(authOptions);
