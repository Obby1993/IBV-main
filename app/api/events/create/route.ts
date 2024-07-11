import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10',
});

export async function POST(req: NextRequest) {
  try {
    const bodyText = await req.text();
    console.log('Received body:', bodyText);

    if (!bodyText) {
      return NextResponse.json({ error: 'Request body is empty' }, { status: 400 });
    }

    const { name, dateStart, dateEnd, location, description, numberPlaceMen, numberPlaceWomen, autre, players, imageUrl, price } = JSON.parse(bodyText);
    console.log('Parsed data:', { name, dateStart, dateEnd, location, description, numberPlaceMen, numberPlaceWomen, autre, players, imageUrl, price });

    //image par default
    const defaultImageUrl = '/images/banner_img.jpg';

     // Crée un produit sur Stripe
     const product = await stripe.products.create({
      name,
      description,
      // Vous pouvez ajouter d'autres champs ici selon vos besoins
    });
    const productId = product.id;


    // Crée un prix pour le produit avec le montant en centimes
      const priceData = await stripe.prices.create({
        product: productId,
        unit_amount: price * 100, // Montant en centimes (par exemple, 20,00 $ devient 2000 centimes)
        currency: 'eur', // Devise (par exemple, USD)
      });

      // Récupérez l'identifiant du prix créé
      const priceId = priceData.id;

// Enregistrer l'événement et les détails Stripe dans la base de données
    const newEvent = await prisma.event.create({
      data: {
        name,
        dateStart: new Date(dateStart),
        dateEnd: new Date(dateEnd),
        location: {
          street: location.street,
          city: location.city,
          state: location.state,
          zip: location.zip,
        },
        description,
        imageUrl: imageUrl || defaultImageUrl,
        numberPlaceMen,
        numberPlaceWomen,
        autre,
        price: price * 100,
        stripeProductId: productId,
        stripePriceId: priceId,
        players: {
          create: players.map((player: any) => ({
            name: player.name,
            paiement: player.paiement,
            niveau: player.niveau,
            genre: player.genre,
          })),
        },
      },
      include: {
        players: true,
      },
    });

    console.log('New event created:', newEvent);

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
