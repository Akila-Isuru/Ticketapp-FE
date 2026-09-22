import React from "react";

export const HERO_TAGLINES = [
  { pre: "Don't just hear about it.", italic: "Be there", post: "." },
  { pre: "The moments worth", italic: "showing up", post: "for." },
  { pre: "Sri Lanka's pulse,", italic: "one ticket", post: "at a time." },
  { pre: "From the stage to your seat —", italic: "in seconds", post: "." },
];

interface HeroTaglineProps {
  index: number;
}

const HeroTagline: React.FC<HeroTaglineProps> = ({ index }) => {
  const tagline = HERO_TAGLINES[index % HERO_TAGLINES.length];

  return (
    <h1
      key={index}
      className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05] tracking-tight text-slate-900 mb-6 animate-hero-text-in"
    >
      {tagline.pre} <span className="italic font-normal">{tagline.italic}</span>
      {tagline.post}
    </h1>
  );
};

export default HeroTagline;
