// app/api/events/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

import Cors from '@/lib/cors';

const prisma = new PrismaClient();

//méthode GET
export async function GET(req: NextRequest, res:NextResponse, { params }: { params: { id: string } }) {
  await Cors (req, res);
  const { id } = params;

  if (typeof id !== 'string') {
    return Response.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: id },
      include: {
        players: true, // Inclure les joueurs associés à chaque événement
      },
    });

    if (!event) {
      return Response.json({ error: 'Event not found' }, { status: 404 });
    }

    return Response.json(event, { status: 200 });
  
  } catch (err) {
    console.error('Error fetching event:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Méthode PUT
export async function PUT(req: NextApiRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, description, dateStart, dateEnd, numberPlaceMen, numberPlaceWomen, autre, players,location } = await req.body;
  if (typeof id !== 'string') {
    return Response.json({ error: 'Invalid ID format' }, { status: 400 });
  }
  try {

    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: {
        name,
        description,
        location:{
          city:location.city,
          state:location.state,
          street: location.street,
          zip: location.zip
        },
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        numberPlaceMen: Number(numberPlaceMen),
        numberPlaceWomen: Number(numberPlaceWomen),
        autre,
        players: {
          create: players.map((player: any) => ({
            name: player.name,
            paiement: player.paiement,
            niveau: player.niveau,
            genre: player.genre,
          })),
        }
      }
    });
    console.log('Updated event:', updatedEvent);
    return Response.json(updatedEvent, { status: 200 });
  } catch (err) {
    console.error('Error updating event:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}



//M2thode DELETE
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const deletePlayers = await prisma.player.deleteMany({
      where: {
        eventId: id // Supprime tous les joueurs liés à l'événement spécifié par son ID
      }

    })
    const deletedEvent = await prisma.event.delete({
      where: { id: id },
    });

    if (!deletedEvent) {
      return Response.json({ error: 'Event not found' }, { status: 404 });
    }

    return Response.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
