// lib/helpers.ts
import prisma from "@/lib/prisma";
import Stripe from 'stripe';

export const findPlayerFromCustomer = async (ibvID: unknown) => {
    if (typeof ibvID !== "string") {
        return null;
    }

    return prisma.player.findFirst({
        where: {
            id: ibvID,
        },
    });
};


  export function isCustomer(customer: Stripe.Customer | Stripe.DeletedCustomer): customer is Stripe.Customer {
    return (customer as Stripe.Customer).metadata !== undefined;
  }