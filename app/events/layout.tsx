// app/events/layout.tsx
import React from 'react';
import { Inter } from "next/font/google";
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/Footer';
import ClientLayout from "../components/ClientLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/config/authOptions';

const inter = Inter({ subsets: ["latin"] });

interface EventsLayoutProps {
  children: React.ReactNode;
}

const EventsLayout = async ({ children }: EventsLayoutProps) => {
  const session = await getServerSession(authOptions);

  return (
 
        <ClientLayout session={session}>
      <div className={inter.className}>
          <Navbar />
          {children}
          <Footer />
      </div>
        </ClientLayout>
    
  );
};

export default EventsLayout;
