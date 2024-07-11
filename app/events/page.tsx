// pages/events/index.tsx
"use client"
import { useEffect, useState } from 'react';
import React from "react";
import Card from "../components/eventPart/card/CardEvent";
import  {Event} from "../types";
import style from "./indexEvent.module.css"



export default function Events()  {
  const [events, setEvents] = useState<Event[]>([]);


  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => setEvents(data));
  }, []);




  return (
      <div className={style.contener}>
        <h1 className='titre'>Nos événements</h1>
        <ul className='flex justify-around align-middle p-5'>
          {events.map(event => (
            <li key={event.id}>
              <Card event={event}/>
            </li>
          ))}
        </ul>
      </div>

  );
};
