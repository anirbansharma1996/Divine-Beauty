import React from "react";
import { Best } from "./Items/best";
import { Combo } from "./Items/combo";
import { Man } from "./Items/man";
import { Woman } from "./Items/woman";

export const HeroProduct = () => {
  return (
    <section id="portfolio" className="portfolio">
     <Best />
      <Man/>
      <Combo/>
      < Woman/>
    </section>
  );
};

