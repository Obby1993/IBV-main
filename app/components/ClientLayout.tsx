// app/components/ClientLayout.tsx
"use client";

import React, { ReactNode } from 'react';
import { SessionProvider  } from "next-auth/react";
import { Session } from "next-auth";

interface ClientLayoutProps {
  children: ReactNode;
  session: Session | null;
}

const ClientLayout = ({session, children }: ClientLayoutProps) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};

export default ClientLayout;
