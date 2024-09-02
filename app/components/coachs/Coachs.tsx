import React, { Children } from "react";
import Coach from "./coach/Coach";
import style from "./coachs.module.css"
import StyledLink from "../StyledLink";

import { TypeCoachData } from "@/app/types";
interface CoachsProps {
  coachs: TypeCoachData[];
}


export default function Coachs({coachs}:CoachsProps ) {
  return (
  <div  id="section2">
    <div className={style.contener}>
      <div className="carousel w-full">
        {coachs.map((coach:TypeCoachData, index: number) => (
          <div  key={coach.id}id={`item${index}`} className="carousel-item w-full">
            <Coach  coachData={coach} />
          </div>
          
        ))}
      </div>  
    </div>  
    <div className={style.btn_coach}>
      <div className="flex flex-wrap justify-around  m-auto w-full">
        {coachs.map((coach:TypeCoachData, index: number) => (
          <div key={coach.id} className=" sm:w-1/2  mb-4 m-auto  ">

            <StyledLink className={"mb-8"} href={`#item${index}`} >{coach.name}</StyledLink>
          </div>
          // <a  href={`#item${index}`} className="btn btn-xs"> {coach.name}</a>
        ))}

      </div>
    </div>
  </div>
)
}
