// lib/helpers.ts
import prisma from "@/lib/prisma";
import Stripe from 'stripe';
import { Event } from "../app/types";

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

  

// Fonction pour trier les événements par dateStart et filtrer les événements à venir
export const getUpcomingSortedEvents = (events: Event[]): Event[] => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Pour s'assurer que seules les dates d'aujourd'hui ou futures sont prises en compte

  return events
    .filter(event => new Date(event.dateStart) >= today)
    .sort((a, b) => new Date(a.dateStart).getTime() - new Date(b.dateStart).getTime());
};