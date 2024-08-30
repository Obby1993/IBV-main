import { NextResponse } from 'next/server';
import  prisma  from '../../../lib/prisma'; // Assurez-vous que le chemin vers Prisma est correct

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const ids: string[] = body.ids;

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: 'No player IDs provided' }, { status: 400 });
    }

    await prisma.player.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return NextResponse.json({ message: 'Players deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting players:', error);
    return NextResponse.json({ error: 'Failed to delete players' }, { status: 500 });
  }
}
