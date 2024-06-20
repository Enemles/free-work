import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import { prisma } from "../../../../lib/prisma";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, profile }) {
      const githubId = profile.id.toString();

      let existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        existingUser = await prisma.user.create({
          data: {
            email: user.email,
            firstName: profile.name?.split(' ')[0],
            lastName: profile.name?.split(' ')[1],
            profilePictureUrl: profile.avatar_url,
            githubId: githubId,
          },
        });
      }

      return true;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const userRecord = await prisma.user.findUnique({
          where: { email: user.email },
        });

        token.id = userRecord.id;
        token.role = userRecord.role;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
