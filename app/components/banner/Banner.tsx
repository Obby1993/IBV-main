"use client"
import React from "react";
import styles from "./banner.module.css";
import StyledLink from '../StyledLink';
import SignOutButton from "../SignOutButton/SignOutBtn";
import { useSession } from "next-auth/react";
import AnimatedLogo from "./logo/animatedLogo";

export default function Banner ({  }) {

  const { data: session } = useSession()

  return (<div className={styles.contenaire}>
      <h1 className="titre ">Imagine Beach Volley</h1>
    <div className={styles.textLogo}>
    <AnimatedLogo src="/images/logo_ibv.png" alt="Logo" className= {styles.logo} />
      <div className="p-6">
        <p className={styles.textBanner} >  Bienvenue ! <br/> Nous proposons des stages intensifs de beach-volley en France et à l'étranger. <br/> Rejoignez-nous pour vivre une expérience unique, encadrée par des professionnels du beach-volley, et améliorez vos compétences tout en découvrant de nouveaux horizons !!</p>
        <div className="hidden sm:block">

        <StyledLink href={"/events"} className={"mr-8"}>Les Stages  IBV </StyledLink>
        <StyledLink href={"#section2"} className={"mr-8"}>Les  Coachs </StyledLink>
        {session ? (<SignOutButton />)
        :
        (<StyledLink href={"/login"} className={"mr-8"}> Connexion</StyledLink>)}
        </div>
      </div>
    </div>
      

  </div>
)}
