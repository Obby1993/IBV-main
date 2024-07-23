import { NextRequest, NextResponse } from 'next/server';
import { buffer } from 'micro';
import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-04-10',
});

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const buf = await bufferFromRequest(req);
  const sig = req.headers.get('stripe-signature') || '';

  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleCheckoutSession(session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

async function bufferFromRequest(req: NextRequest): Promise<Buffer> {
  const body = await req.text();
  return Buffer.from(body);
}

async function handleCheckoutSession(session: any) {
  await prisma.player.update({
    where: {
      stripeCustomerId: session.customer,
    },
    data: {
      paiement: true,
    },
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
