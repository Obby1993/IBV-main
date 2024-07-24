import { NextApiRequest, NextApiResponse } from 'next';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { stripe } from '../../../lib/stripe';
import prisma from '../../../lib/prisma'; // Ajustez le chemin selon votre configuration Prisma

export const config = {
  api: {
    bodyParser: false, // Désactiver le bodyParser intégré de Next.js pour traiter les requêtes Stripe
  },
};

// Type guard pour vérifier que le client est un Customer et non un DeletedCustomer
function isCustomer(customer: Stripe.Customer | Stripe.DeletedCustomer): customer is Stripe.Customer {
  return (customer as Stripe.Customer).metadata !== undefined;
}

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
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.customer) {
        const customer = await stripe.customers.retrieve(session.customer as string);

        if (isCustomer(customer) && customer.metadata.ibvID) {
          const ibvID = customer.metadata.ibvID;

          // Mettre à jour la base de données ici
          try {
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
            console.error('Error updating player record:', err);
            return res.status(500).send('Server error');
          }

          return res.status(200).json({ received: true });
        } else {
          console.error('ibvID is missing in customer metadata or customer is not a valid Customer');
          return res.status(400).json({ error: 'ibvID is missing in customer metadata or customer is not a valid Customer' });
        }
      } else {
        console.error('Customer is null in session:', session);
        return res.status(400).json({ error: 'Customer is null in session' });
      }
    }

    // Retourner une réponse 200 pour indiquer à Stripe que le webhook a été reçu correctement
    return res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default webhookHandler;
