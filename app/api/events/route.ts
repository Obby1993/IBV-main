// app/api/events/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();




export async function GET() {
  try {
    const events = await prisma.event.findMany({
      include: {
        players: true, // Inclure les joueurs associés à chaque événement
      },
    });
    console.log("Events fetched:", events); 
    return NextResponse.json(events);
   
  } catch (error) {
    console.error("Failed to fetch events:", error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
    
  }
}
