"use client"
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import { TypeCoachData } from "@/app/types";
import { motion } from "framer-motion";
import { useInView } from '../../../hooks/useInView';  // Ajustez le chemin selon votre structure de fichiers
import ScrollImage from "./scrollImage";
import style from "../coachs.module.css"
interface CoachProps {
  coachData: TypeCoachData;
}


const listItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2
    }
  })
};


export default function Coach({ coachData }: CoachProps) {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <div className={style.coach}>
      <h1 className="titre">{coachData.name}</h1>
      {/* <div className="" > */}
        <div key={coachData.id} className=" pt-5 md:flex md:flex-row md:justify-around lg:flex-row lg:justify-around ">
          <div className={style.picture} >
          <ScrollImage
              src={coachData.picture}
              alt="Coach Image"
              className="rounded-lg shadow-2xl"
              style={{  overflow: "hidden", margin:'auto' }}
            />

          </div>
          <div className="align-top flex- mx-9 ">
            <h2 style={{ textDecoration: 'underline', color: 'white', fontWeight: 'bolder' }}>Le Mot du coach:</h2> 
            <p
              className="pb-6 text-white text-justify mb-3"
              style={{ height: '175px' }}            >
              {coachData.devise}
            </p>
            <h2
              style={{ textDecoration: 'underline', color: 'white', fontWeight: 'bolder', marginTop: '30px' }}
            >
              Palmarès:
            </h2>
            <ul ref={ref}>
              {coachData.palmares.map((palmares, index) => (
            <motion.li
            key={index}
            className="text-white"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 10 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <FontAwesomeIcon icon={faMedal} style={{ color: '#FAB03E' }} /> {palmares.year}: {palmares.achievement}
          </motion.li>
              ))}
            </ul>
          </div>
        </div>
      {/* </div> */}
    </div>
  );
}
