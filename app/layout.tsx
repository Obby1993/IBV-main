import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "./globals.css";
import ClientLayout from "./components/ClientLayout";
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/app/config/authOptions';

import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Imagine Beach Volley",
  description: "Organisation de stage de beach volley en France et à l'étranger. ",
};

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  const session: Session | null = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout session={session}>{children}</ClientLayout>
      </body>
    </html>
  );
}
