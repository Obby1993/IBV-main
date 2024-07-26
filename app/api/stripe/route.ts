import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { findPlayerFromCustomer } from "@/lib/helpers"; // Importez la fonction auxiliaire


export const POST = async (req: NextRequest) => {
    const body = (await req.json()) as Stripe.Event;


switch(body.type) {
    case "checkout.session.completed": {
        const session = body.data.object as Stripe.Checkout.Session;
        
        if (session.customer && typeof session.customer === "string") {
            const customer = await stripe.customers.retrieve(session.customer);

            if (!customer.deleted && 'metadata' in customer) {
                const ibvID = customer.metadata.ibvID;
                const player = await findPlayerFromCustomer(ibvID);

                if (player?.id) {
                    await prisma.player.update({
                        where: {
                            id: player.id,
                        },
                        data: {
                            paiement: true,
                        },
                    });
                    console.log("Checkout session completed", session);
                }
            }
        }
        break
        
    }
    default: {
        console.log("Unhandled event type", body.type);
        
    }
}

return NextResponse.json({
    ok: true,
})

}

// export const findPlayerFromCustomer = async (ibvID: unknown) =>{
//     if (typeof ibvID !== "string") {
//         return null;
//     }

//     return prisma.player.findFirst({
//         where: {
//             id: ibvID,
//         },
//     })
// }