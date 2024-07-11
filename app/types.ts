// types.ts
// import { Session } from "next-auth";

export interface Event {
  id: string;
  name: string;
  dateStart: Date;
  dateEnd: Date;
  location: {
    street: string;
    city: string;
    state: string;
    zip: string;
  } | null;
  description: string;
  numberPlaceMen: number;
  numberPlaceWomen: number;
  price: number;
  stripePriceId : string;
  stripeProductId: string;
  autre: string;
  players: Player[];
  imageUrl: string
}
export type Player = {
  name: string;
  id: string;
  paiement: boolean;
  niveau: string;
  genre: string;
  eventId: string;
  email: string;
};
// Ajoutez d'autres types ici
export interface User {
  id: string;
  name: string;
  email: string;
  // autres propriétés
}

// export interface SessionProps {
//   session: Session | null;
// };
export interface Palmares {
  year: number;
  achievement: string;
}

export interface TypeCoachData {
  id: number;
  name: string;
  picture: string;
  palmares: Palmares[];
  devise: string;
}
