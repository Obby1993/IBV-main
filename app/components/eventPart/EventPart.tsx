"use client"
import React from "react";
import {useEffect, useState} from "react";
import Card from "./card/CardEvent"
import style from "./events.module.css"
import  {Event}  from '../../types';

type Props = {};

export default function EventPart() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);

  const selectedEvents = events.slice(0, 2);

  return(
  <div className={style.contenaire}>
    <h1 className="titre">Prochains Evénements</h1>
        <div className=" flex justify-around items-center gap-4">
          {selectedEvents.map(event => (
            <Card key={event.id} event={event} />
          ))}
        </div>
  </div>

  )
}
