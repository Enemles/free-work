import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import { prisma } from "../../../../lib/prisma"; // Utilisation de l'alias @/lib

export const authOptions: NextAuthOptions = {
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
    async signIn({ user, account, profile }) {
      const githubId = profile.id.toString();

      const existingUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            email: user.email,
            firstName: profile.name?.split(' ')[0],
            lastName: profile.name?.split(' ')[1],
            profilePictureUrl: profile.image,
            bio: '',
            location: '',
            githubId: githubId,
          },
        });
      } else {
        await prisma.user.update({
          where: { email: user.email },
          data: {
            githubId: githubId,
          },
        });
      }
      return true;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
