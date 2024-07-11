"use client"
import React from "react";
import styles from "./banner.module.css";
import StyledLink from '../StyledLink';
import SignOutButton from "../SignOutButton/SignOutBtn";
import { useSession } from "next-auth/react";



export default function Banner ({  }) {

  const { data: session } = useSession()

  return (<div className={styles.contenaire}>
    <div >
      <h1 className="titre">Imagine Beach Volley</h1>
      <div className="p-6">
      <p className={styles.textBanner}>Nous organisons des stages intensifs de Beach Volley en France et à l'étranger !</p>
      <StyledLink href={"/events"}>Les Stages  IBV </StyledLink>
      <StyledLink href={"#section2"}>Les  Coachs </StyledLink>
      {session ? (<SignOutButton />)
      :
      (<StyledLink href={"/login"}> Connexion</StyledLink>)}
      </div>
    </div>
      <img src="/images/logo_ibv.png" alt="logo"/>

  </div>
)}
