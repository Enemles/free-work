import { NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';

export async function GET(req) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        profilePictureUrl: true,
      },
    });

    const freelancers = users.filter(user => user.role === 'freelance');
    const clients = users.filter(user => user.role === 'client');

    return NextResponse.json({ freelancers, clients }, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des utilisateurs' }, { status: 500 });
  }
}
