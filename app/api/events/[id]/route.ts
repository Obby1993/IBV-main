// app/api/events/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  if (typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const event = await prisma.event.findUnique({
      where: { id: id },
      include: {
        players: true,
      },
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  
  } catch (err) {
    console.error('Error fetching event:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();
  const { name, description, dateStart, dateEnd, numberPlaceMen, numberPlaceWomen, autre, players, location } = body;
  
  if (typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: id },
      data: {
        name,
        description,
        location: {
          city: location.city,
          state: location.state,
          street: location.street,
          zip: location.zip,
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
        },
      },
    });
    console.log('Updated event:', updatedEvent);
    return NextResponse.json(updatedEvent, { status: 200 });
  } catch (err) {
    console.error('Error updating event:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    await prisma.player.deleteMany({
      where: {
        eventId: id,
      },
    });
    
    const deletedEvent = await prisma.event.delete({
      where: { id: id },
    });

    if (!deletedEvent) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Event deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
