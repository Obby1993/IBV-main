import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {stripe} from '../../../../../lib/stripe';
import {Player} from '../../../../types.js'

const prisma = new PrismaClient();


export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  //récupère l'id des params
  const { id } = params;
  const { name, niveau, genre, email } = await req.json();
  //si il y a une mauvaise id
  if (typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid ID format' }, { status: 400 });
  }


  try {
// trouve l'event correspondant à l'id
    const event = await prisma.event.findUnique({
      where: { id },
      include: { players: true },
    });
        // si tu ne trouve pas l'event
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }
 
    // Créer player
    const newPlayer = await prisma.player.create( {
      data:{ name, paiement: false, niveau, genre, email, stripeCustomerId: null, eventId:id }
    });
    
      // Créer un client Stripe
    const customer = await stripe.customers.create({
      name,
      email,
      metadata: {ibvId:newPlayer.id },
    });
    



    // Créer une session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: event.stripePriceId ||"",
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer: customer.id,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/events/${event.id}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/events/${event.id}`,
    });

    return NextResponse.json( { sessionId: session.id}, { status: 200 });
  } catch (err) {
    console.error('Error updating event:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
