// app/components/SignOutButton.tsx

"use client"; // Indique que ce fichier est un composant client

import React from "react";
import { signOut, signIn } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button className="btn btn-outline btn-warning font-emoji mr-6" onClick={() => signOut()}>Déconnexion</button>
  );
}
