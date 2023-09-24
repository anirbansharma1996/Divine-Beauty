import React from "react";
import { Perfume } from "./Items/perfume";
import { Combo } from "./Items/combo";
import { Man } from "./Items/man";
import { Woman } from "./Items/woman";

export const HeroProduct = () => {
  return (
    <section id="portfolio" className="portfolio">
      <Perfume />
      <Man/>
      <Combo/>
      <Woman/>
    </section>
  );
};

