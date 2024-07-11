import React from "react";
import Coach from "./coach/Coach";
import style from "./coachs.module.css"
import { TypeCoachData } from "@/app/types";
interface CoachsProps {
  coachs: TypeCoachData[];
}


export default function Coachs({coachs}:CoachsProps ) {
  return (
  <div className={style.contener} id="section2">
    {coachs.map((coach:TypeCoachData) => (
    <Coach key={coach.id} coachData={coach} />
  ))}
  </div>
)
}
