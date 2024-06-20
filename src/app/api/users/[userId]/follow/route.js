import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export async function POST(req, { params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const followerId = token.id;
    const { userId: followingId } = params;

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: parseInt(followerId, 10),
          followingId: parseInt(followingId, 10),
        },
      },
    });

    if (existingFollow) {
      return NextResponse.json({ message: 'Already following' }, { status: 400 });
    }

    const follow = await prisma.follow.create({
      data: {
        followerId: parseInt(followerId, 10),
        followingId: parseInt(followingId, 10),
      },
    });

    return NextResponse.json(follow, { status: 201 });
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json({ error: 'Erreur lors du suivi de l\'utilisateur' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const followerId = token.id;
    const { userId: followingId } = params;

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: parseInt(followerId, 10),
          followingId: parseInt(followingId, 10),
        },
      },
    });

    if (!existingFollow) {
      return NextResponse.json({ message: 'Not following' }, { status: 400 });
    }

    await prisma.follow.delete({
      where: {
        id: existingFollow.id,
      },
    });

    return NextResponse.json({ message: 'Unfollowed successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'annulation du suivi de l\'utilisateur' }, { status: 500 });
  }
}
