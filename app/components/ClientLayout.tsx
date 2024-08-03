// app/components/ClientLayout.tsx
"use client";

import React, { ReactNode } from 'react';
import { SessionProvider  } from "next-auth/react";
import { Session } from "next-auth";
import Cursor  from "./cursor/cursorProvider"
import {useState} from "react"

interface ClientLayoutProps {
  children: ReactNode;
  session: Session | null;
}




const ClientLayout = ({session, children }: ClientLayoutProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


 
  return (
    <SessionProvider session={session}>
      {children}
      <Cursor />
    </SessionProvider>
  );
};

export default ClientLayout;

