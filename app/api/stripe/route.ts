import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import {stripe} from '../../../lib/stripe';
import Stripe from 'stripe';
import prisma from '../../../lib/prisma'; 

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2022-11-15',
// });


export const config = {
  bodyParser: false,
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'] as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
    }

    // Handle the event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.metadata) {
        try {
          await prisma.player.create({
            data: {
              name: session.metadata.name!,
              email: session.metadata.email!,
              niveau: session.metadata.niveau!,
              genre: session.metadata.genre!,
              stripeCustomerId: session.customer as string,
              eventId: session.metadata.eventId!,
              paiement: true,
            },
          });
        } catch (error) {
          console.error('Erreur lors de la création de l\'utilisateur:', error);
          return res.status(500).json({ error: 'Database Error' });
        }
      } else {
        console.error('Metadata is null or undefined in session:', session);
        return res.status(400).json({ error: 'Metadata is null or undefined' });
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default webhookHandler;