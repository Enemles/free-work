// app/api/users/[id]/route.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: 'Utilisateur non trouvé' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération de l\'utilisateur' }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { email, password, firstName, lastName, bio, location, profilePictureUrl } = body;

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: { email, password, firstName, lastName, bio, location, profilePictureUrl },
    });

    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la mise à jour de l\'utilisateur' }), { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur lors de la suppression de l\'utilisateur' }), { status: 400 });
  }
}
