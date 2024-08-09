import React , { useState }  from "react";
import  {Event}  from '../../../types';
import  StyledLink from "../../StyledLink";
import style from "../cardShow/cardShow.module.css"



interface CardProps  {
  event: Event;
};

export default function Card({event}:CardProps) {
 
 

  return(
    
    <div className="m-auto card-compact w-96 bg-base-100 shadow-xl rounded-md ">
      <div className="rounded-tr-md rounded-tl-md bg-cover bg-no-repeat" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url(${event.imageUrl})`, height:`250px` }}>
        <h2 className={`${style.dateStage} text-center `} >{new Date(event.dateStart).toLocaleDateString()} - {new Date(event.dateEnd).toLocaleDateString()}</h2>
      </div>
      <div className="card-body">
        <h2 className="titreCard">{event.name}</h2>
        <p>{event.description} - {event.autre}</p>

        <div className="card-actions justify-end">
        <StyledLink href={`/events/${event.id}`} className={""}>Voir événement </StyledLink>
        </div>
      </div>
    </div>
  );
}
