import React from "react";
import { Hero } from "./hero";
import { Clients } from "./clients";
import { Count } from "./count";
import { Contact } from "./contact";
import { Faq } from "./faq";
import { HeroProduct } from "./Product/heroProduct";


export const Home = () => {

  return (
    <>
      <Hero />
      <main id="main">
        <Clients />
        <HeroProduct/>
        <Count />
        <Faq />
        <Contact />
      </main>
    </>
  );
};
