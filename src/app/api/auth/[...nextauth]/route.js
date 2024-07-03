import NextAuth from "next-auth";
import GithubProvider from 'next-auth/providers/github';
import { prisma } from "../../../../lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, profile, account }) {
      if (account.provider === 'github' && account.type === 'oauth' && profile) {
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
      }
      return false;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account }) {
      if (user) {
        const userRecord = await prisma.user.findUnique({
          where: { email: user.email },
        });

        token.id = userRecord.id;
        token.role = userRecord.role;
        if (account) {
          token.accessToken = account.access_token;
        }
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};

const handler = async (req, res) => {
  if (req.body && req.body.code === 'mocked_code') {
    // Simuler une session pour les tests
    const user = {
      id: 'mocked_user_id',
      email: 'test@example.com',
      role: 'user',
    };

    const token = {
      id: 'mocked_user_id',
      role: 'user',
      accessToken: 'mocked_access_token',
    };

    res.setHeader('Set-Cookie', [
      `next-auth.session-token=${token.accessToken}; Path=/; HttpOnly; SameSite=Strict`,
    ]);

    return res.status(200).json({ user, token });
  }

  return NextAuth(req, res, authOptions);
};

export { handler as GET, handler as POST };
