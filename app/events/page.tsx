// app/events/page.tsx
"use client"
import { useEffect, useState } from 'react';
import React from "react";
import Card from "../components/eventPart/card/CardEvent";
import { Event } from "../types";
import style from "./indexEvent.module.css";
import { getUpcomingSortedEvents } from "@/lib/helpers"

export default function Events() {
  const [events, setEvents] = useState<Event[]>([]);
  const apiUrl = process.env.NEXT_PUBLIC_APP_URL;

  const fetchEvents = async () => {
    const response = await fetch(`${apiUrl}/api/events`);
    const data = await response.json();
    console.log(data);
    
    const SortedEvents = getUpcomingSortedEvents(data);
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className={style.contener}>
      <h1 className='titre'>Nos événements</h1>
      <ul className='flex flex-wrap justify-around align-middle p-5'>
        {events.map(event => (
          <li key={event.id}>
            <Card event={event} />
          </li>
        ))}
      </ul>
    </div>
  );
}
