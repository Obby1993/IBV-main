import React from 'react';
import { PrismaClient } from '@prisma/client';
import  {Event} from "../../../types";
import style from "./cardShow.module.css"
import Link from 'next/link';
import PlayerList from "./playersList/PlayerList";

const prisma = new PrismaClient();

type CardShow = {
  eventData: Event;

};

type Player = {
  id: string;
  name: string;
  paiement: boolean;
  niveau: string;
  genre: string;
  eventId: string;
};
const nbGenrePlaceDispo = (players:Player[], placeGenre:number, genres: string[] ): number => {
  // Compte le nombre de joueurs du genre spécifié
  const playersArray = Object.values(players);
  const playersGenreCount = playersArray.filter(player => genres.includes(player.genre)).length;
  const genreRest = placeGenre - playersGenreCount
  return genreRest
}



export default function cardShow({eventData} : CardShow) {

  const womenPlaceDispo = nbGenrePlaceDispo(eventData.players, eventData.numberPlaceWomen, ["Femme","Female", "Féminin","femme","female", "féminin"])
  const menPlaceDispo = nbGenrePlaceDispo(eventData.players, eventData.numberPlaceMen, ["Male", "Homme", "Masculin", "male", "homme", "masculin"])
 
  const registration = (womenPlaceDispo + menPlaceDispo) >= 0;
    
     

  return (
    <div className="card bg-base-100 shadow-xl ">
      {/* <div className="bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${eventData.imageUrl})` }}> */}
      <div className="card-body p-0">
        <div className="rounded-tr-md rounded-tl-md bg-cover bg-no-repeat relative " style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${eventData.imageUrl})`, height:`auto` }}>
          <div className=' flex flex-col md:flex-row items-center justify-around p-5'>
            <h2 className="titre mb-6 p-0">{eventData.name}</h2>
            <h2 className={style.dateStage}>{new Date(eventData.dateStart).toLocaleDateString()} - {new Date(eventData.dateEnd).toLocaleDateString()}</h2>
          </div>
          <div className='m-10 text-white text-center text-xl'>
            <p>{eventData.autre}</p>
            <p>{eventData.description}</p>
          </div>
          <div className="card-actions justify-center mt-24 mb-5 " >
            <Link href={registration ? `/events/${eventData.id}/register` : "#"}
              className={` btn font-emoji content-center text-xl p-5 border-blue-900 text-blue-900 ${!registration ? ' cursor-not-allowed' : 'btn-warning'}`}
              aria-disabled={!registration}>
              {registration ? "Je m'inscris !" : "Inscription fermée"}
            </Link>
          </div>
            <h1 className={style.displayPrice}>{eventData.price/100} €</h1>
        </div>
        <div className='p-7'>
          <h3> Lieu: <span className='text-xl font-semibold w-[30%]'>{eventData.location?.street} - {eventData.location?.state} {eventData.location?.city}</span></h3>
          <div className={style.disponibilite}>
            <p><span className='text-7xl font-semibold w-[30%]' >{eventData.numberPlaceMen + eventData.numberPlaceWomen - eventData.players.length}</span> Places restantes / {eventData.numberPlaceMen + eventData.numberPlaceWomen}</p>
            <p> <span className='text-4xl w-[20%] h-[72px]'> {womenPlaceDispo} </span> en féminin </p>
            <p><span className='text-4xl w-[20%]'> {menPlaceDispo}</span> en masculin</p>
          </div>
          
          <PlayerList initialPlayers={eventData.players} />
        </div>
      </div>

      </div>


  )
}
