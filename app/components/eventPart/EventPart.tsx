"use client"
import React from "react";
import {useEffect, useState} from "react";
import Card from "./card/CardEvent"
import style from "./events.module.css"
import  {Event}  from '../../types';
import StyledLink from '../StyledLink';
// import { getUpcomingSortedEvents } from "@/lib/helpers";


type Props = {};

export default function EventPart() {
  const [events, setEvents] = useState<Event[]>([]);


  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  // const SortedEvents = getUpcomingSortedEvents(events);
  // const selectedEvents = SortedEvents.slice(0, 2);
  return(
  <div className={style.contenaire} >
    <h1 className="titre">Prochains Evénements</h1>
      <div className=" md:flex justify-around items-center gap-4 mt-8">
        {/* {selectedEvents.map(event => ( */}
        {events.map(event => (
          <Card key={event.id} event={event} />
        ))}
      </div>
      <div className=" flex justify-around m-8">
        <StyledLink href={"/events"} className="">Les Stages  IBV </StyledLink>
      </div>
  </div>

  )
}
