"use client"
import React from "react";
import {useEffect, useState} from "react";
import Card from "./card/CardEvent"
import style from "./events.module.css"
import  {Event}  from '../../types';
import StyledLink from '../StyledLink';


import useSWR from 'swr';
type Props = {};



  

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function EventPart() {
  const { data: events, error } = useSWR<Event[]>('/api/events', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!events) return <div>Loading...</div>;

  return (
    <div className={style.contenaire}>
      <h1 className="titre">Prochains Evénements</h1>
      <div className=" flex flex-col md:flex-row justify-around items-center gap-4 mt-8">
        {events.map(event => (
          <Card key={event.id} event={event} />
        ))}
      </div>
      <div className="flex justify-around m-8">
        <StyledLink href={"/events"} className="">Les Stages IBV</StyledLink>
      </div>
    </div>
  );
}
