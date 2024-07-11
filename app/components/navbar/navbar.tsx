"use client"
import React from 'react';
import Link from "next/link";
import style from './navbar.module.css';
import StyledLink from '../StyledLink'
//pour avoir notre url
import {usePathname} from "next/navigation";
import SignOutButton from "../SignOutButton/SignOutBtn";
import { useSession } from "next-auth/react";

type Navbar = {

  label?: string,
  href?: string
}

export default function navbar() {
  const { data: session } = useSession()
  //creons une variable de l'url
  const  pathName = usePathname()
  //maintenant en comparant exemple:    className = {pathName === ${link.href} ? " text-blue-50": ""} mais seulement dans mes composants clients



  const navItems = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Stages",
      href: "/events"
    },



  ]

  return (
    <div className={style.bg}>
      <div className='pr-10'>
        <Link href="/" >
            {/* <a className="btn btn-ghost normal-case text-xl"> */}
              <img  src="/images/logo_ibv.png" alt="logo" className={style.img} />
            {/* </a> */}
          </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
        {navItems.map((link, index) => (
          <li key={index}>
            <StyledLink href={link.href}>{link.label} </StyledLink>
          </li>
          ))}
          {session ? <>(<li><StyledLink href={'/events/create'}>Créer un stage </StyledLink></li>
                      <li className='pt-2'><SignOutButton /></li>
                      <li className='titreCard mt-5'>{session.user?.name} est connecté. </li>)</>
            :        (<li><StyledLink href={"/login"}> Connexion</StyledLink></li>)}

        </ul>
     </div>
    </div>
  )
}
