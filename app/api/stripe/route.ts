import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { stripe } from '../../../lib/stripe';
import prisma from '../../../lib/prisma'; // Ajustez le chemin selon votre configuration Prisma

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2022-11-15',
// });

export const config = {
  api: {
    bodyParser: false, // Désactiver le bodyParser intégré de Next.js pour traiter les requêtes Stripe
  },
};

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature']!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
      } catch (err) {
        console.error('Webhook signature verification failed.');
        if (err instanceof Error) {
          return res.status(400).send(`Webhook Error: ${err.message}`);
        } else {
          return res.status(400).send('Webhook Error: An unknown error occurred.');
        }
      }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        // Mettre à jour la base de données ici
        const customerId = session.customer as string;

        try {
          await prisma.player.update({
            where: { stripeCustomerId: customerId },
            data: { paiement: true },
          });
        } catch (err) {
          console.error('Error updating player record:', err);
          return res.status(500).send('Server error');
        }

        break;
      // Ajoutez d'autres types d'événements si nécessaire
      default:
        console.warn(`Unhandled event type ${event.type}`);
    }

    // Retourner une réponse 200 pour indiquer à Stripe que le webhook a été reçu correctement
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
