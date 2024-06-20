import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: token.id },
      include: {
        followers: {
          include: {
            Follower: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        following: {
          include: {
            Following: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Transform the response to add a "following" field for each user
    const followers = user.followers.map(follower => ({
      ...follower.Follower,
      isFollowing: user.following.some(f => f.followingId === follower.Follower.id),
    }));

    const following = user.following.map(following => ({
      ...following.Following,
      isFollowing: user.following.some(f => f.followingId === following.Following.id),
    }));

    return NextResponse.json({
      ...user,
      followers,
      following,
    }, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du profil' }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { firstName, lastName, bio, location, profilePictureUrl, role } = await req.json();

    const user = await prisma.user.update({
      where: { id: token.id },
      data: { firstName, lastName, bio, location, profilePictureUrl, role },
    });

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du profil' }, { status: 500 });
  }
}
