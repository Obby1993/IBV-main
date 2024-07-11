import React from "react";
import Banner from "../components/banner/Banner";
import EventPart from "../components/eventPart/EventPart";
import Coachs from "../components/coachs/Coachs";
import Footer from "../components/footer/Footer";
import coachesData from "../data/coaches.json";
import { TypeCoachData } from "@/app/types";

export default async function Home() {


  return (
    <main >
      <Banner />
      <EventPart />
      <Coachs coachs={coachesData as TypeCoachData[]} />
      <Footer />
    </main>
  );
}
