import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-17rem)] flex flex-col items-center p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-vintage-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-tcg-yellow rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-80 h-80 bg-vintage-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-5xl w-full z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side: Brand / Intro */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-block relative">
            <h1 className="text-8xl md:text-9xl font-display font-black text-vintage-900 tracking-tighter leading-none opacity-90 select-none">
              POKÉ
              <br />
              WIKI
            </h1>
            <div className="absolute -top-6 -right-6 text-6xl text-tcg-red transform rotate-12 opacity-80 mix-blend-multiply pointer-events-none">
              ★
            </div>
            <div className="h-2 w-full bg-vintage-900 mt-2"></div>
          </div>

          <p className="text-xl md:text-2xl font-serif italic text-vintage-700 leading-relaxed max-w-md mx-auto lg:mx-0">
            "A comprehensive guide for the modern trainer. Cataloging the
            wonders of the Pokémon world."
          </p>

          <p className="text-md font-body text-vintage-800 leading-relaxed max-w-lg mx-auto lg:mx-0 border-l-4 border-tcg-red pl-4 italic bg-white/40 p-2 rounded-r-md">
            The world of Pokémon is a vibrant ecosystem where humans co-exist
            with creatures of extraordinary power. From the depths of the oceans
            to the highest peaks, these "Pocket Monsters" inhabit every corner
            of the globe, each possessing unique elemental abilities. It is a
            world defined by the bond between Trainers and their partners,
            driven by the spirit of adventure, battle, and discovery.
          </p>

          <div className="font-mono text-sm text-vintage-500 uppercase tracking-widest pt-4 border-t border-vintage-300 inline-block">
            Vol. 1 • 2025 Edition
          </div>
        </div>

        {/* Right Side: Navigation List (Table of Contents Style) */}
        <nav className="flex flex-col space-y-2 w-full">
          <MenuLink
            to="/pokemon"
            number="01"
            title="Pokédex Details"
            subtitle="Complete database of all known species."
          />
          <MenuLink
            to="/items"
            number="02"
            title="Item Storage"
            subtitle="Key objects, tools, and mystical artifacts."
          />
          <MenuLink
            to="/types"
            number="03"
            title="Type Charts"
            subtitle="Elemental strengths and weaknesses analysis."
          />
          <MenuLink
            to="/favorites"
            number="04"
            title="My Collection"
            subtitle="Your personally curated research list."
          />
        </nav>
      </div>
    </div>
  );
};

// Reusable Menu Row Component
const MenuLink = ({ to, number, title, subtitle }) => (
  <Link to={to} className="group block">
    <div className="flex items-baseline gap-6 border-b border-vintage-400/30 pb-4 pt-4 px-4 transition-all duration-300 hover:bg-white/40 hover:pl-8 hover:border-tcg-red">
      <span className="font-mono font-bold text-vintage-400 text-lg group-hover:text-tcg-red transition-colors">
        {number}
      </span>
      <div className="flex-1">
        <h2 className="text-3xl font-display font-bold text-vintage-800 group-hover:text-vintage-900 leading-none mb-1">
          {title}
        </h2>
        <p className="font-sans text-sm text-vintage-600 group-hover:text-vintage-800 opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          {subtitle}
        </p>
      </div>
      <span className="text-2xl text-vintage-300 group-hover:text-tcg-red transform group-hover:translate-x-2 transition-all duration-300">
        →
      </span>
    </div>
  </Link>
);

export default Home;
