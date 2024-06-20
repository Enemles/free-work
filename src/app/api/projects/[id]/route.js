import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { prisma } from '../../../../lib/prisma';

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id, 10) },
    });

    if (!project) {
      return NextResponse.json({ message: 'Projet non trouvé' }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération du projet' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;
    const { title, description, budget, status } = await req.json();

    const project = await prisma.project.update({
      where: { id: parseInt(id, 10) },
      data: {
        title,
        description,
        budget: parseFloat(budget), // Conversion de budget en Float
        status,
      },
    });

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error('PUT Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour du projet' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    await prisma.project.delete({
      where: { id: parseInt(id, 10) },
    });

    return NextResponse.json({ message: 'Projet supprimé' }, { status: 200 });
  } catch (error) {
    console.error('DELETE Error:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression du projet' }, { status: 500 });
  }
}
