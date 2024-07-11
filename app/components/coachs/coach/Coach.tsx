import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { TypeCoachData, Palmares } from "@/app/types";




interface CoachProps {
  coachData: TypeCoachData;
}

export default function Coach({coachData}: CoachProps) {
  return (
          <div>
            <h1 className="titre" >{coachData.name}</h1>
            <div className="hero place-items-start  " key={coachData.id}>
              <div className="hero-content  lg:flex-row align-top" >
                <div style={{ width:'205px',height:'350px'}}>
                  <img src={coachData.picture} className=" rounded-lg shadow-2xl" style={{ width:'300px',overflow:"hidden" }} />
                </div>
                <div style={{ width: '60%', height:'350px', verticalAlign:'top'}}>
                  <p className="pb-6 text-white text-justify" style={{height:'175px'}}>{coachData.devise}</p>
                  <h2 style={{textDecoration: 'underline', color:'white', fontWeight:'bolder'}}>Palmarès:</h2>
                  <ul>
                          {coachData.palmares.map((palmares, index) => (
                            <li key={index} className="text-white">
                              <FontAwesomeIcon icon={faMedal} style={{color: '#FAB03E'}} />         {palmares.year}: {palmares.achievement}
                            </li>
                          ))}
                    </ul>
                  </div>
              </div>
            </div>
          </div>
  );
};
