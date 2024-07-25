import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '../../lib/stripe';
import prisma from '../../lib/prisma';

// export const config = {
//   runtime: 'edge',
// };

// Type guard pour vérifier que le client est un Customer et non un DeletedCustomer
function isCustomer(customer: Stripe.Customer | Stripe.DeletedCustomer): customer is Stripe.Customer {
  return (customer as Stripe.Customer).metadata !== undefined;
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return new NextResponse('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const buf = await req.arrayBuffer();
    const textDecoder = new TextDecoder();
    const str = textDecoder.decode(buf);
    event = stripe.webhooks.constructEvent(Buffer.from(str), sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed.');
    return new NextResponse(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.customer) {
      const customer = await stripe.customers.retrieve(session.customer as string);

      if (isCustomer(customer) && customer.metadata.ibvID) {
        const ibvID = customer.metadata.ibvID;

        try {
          // Récupérer le joueur
          const player = await prisma.player.update({
            where: { id: ibvID },
            data: {
              paiement: true,
              stripeCustomerId: session.customer as string,
            },
          });

          // Ajouter le joueur à l'événement
          await prisma.event.update({
            where: { id: player.eventId },
            data: {
              players: {
                connect: { id: player.id },
              },
            },
          });

        } catch (err) {
          console.error('Error updating player record or event:', err);
          return new NextResponse('Server error', { status: 500 });
        }

        return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
      } else {
        console.error('ibvID is missing in customer metadata or customer is not a valid Customer');
        return new NextResponse('ibvID is missing in customer metadata or customer is not a valid Customer', { status: 400 });
      }
    }
  } else {
    console.warn(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
