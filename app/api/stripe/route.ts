import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { findPlayerFromCustomer, isCustomer } from "@/lib/helpers"; // Assurez-vous d'importer correctement votre fonction auxiliaire

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return new NextResponse('Missing stripe-signature header', { status: 400 });
  }

  let event: Stripe.Event;

  const body = await req.text();
  // console.log("body:", body);

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed.');
    return new NextResponse(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`, { status: 400 });
  }
 
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log("SESSION :",session);
    console.log("SESSION.CUSTOMER:",session.customer);
    if (session.customer && typeof session.customer === "string") {
      const customer = await stripe.customers.retrieve(session.customer);

      console.log("CUSTOMER webhook:",customer);
      if (isCustomer(customer)) {
        console.log("CUSTOMER metadata:",customer.metadata);
        const ibvId = customer.metadata.ibvId;
        console.log("CUSTOMER METADATA ibvId:", customer.metadata.ibvId);
        const player = await findPlayerFromCustomer(ibvId);

        if (player?.id) {
          try {
            await prisma.player.update({
              where: {
                id: player.id,
              },
              data: {
                paiement: true,
              },
            });
            console.log("Checkout session completed", session);
          } catch (err) {
            console.error('Error updating player record:', err);
            return new NextResponse('Server error', { status: 500 });
          }
        }
      } else {
        console.error('ibvId is missing in customer metadata or customer is not a valid Customer');
        return new NextResponse('ibvId is missing in customer metadata or customer is not a valid Customer', { status: 400 });
      }
    } else {
      console.warn('Customer ID is missing or invalid in session.');
      return new NextResponse('Customer ID is missing or invalid in session.', { status: 400 });
    }
  } else {
    console.warn(`Unhandled event type ${event.type}`);
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
