import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession{
    user: DefaultUser & {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      profilePictureUrl: string;
      bio: string;
      location: string;
      githubId: string;
    };
    token: DefaultUser & {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      profilePictureUrl: string;
      bio: string;
      location: string;
      githubId: string;
    };
  }
}