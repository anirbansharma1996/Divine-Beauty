import React from "react";
import { Hero } from "./hero";
import { Clients } from "./clients";
import { Count } from "./count";
import { Contact } from "./contact";
import { Faq } from "./faq";
import { Products } from "./Product/products";

export const Home = () => {
  return (
    <>
      <Hero />
      <main id="main">
        <Clients />
        <Products />
        <Count />
        <Faq />
        <Contact />
      </main>
    </>
  );
};
