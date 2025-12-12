import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center">
      <div className="bg-white/80 backdrop-blur-sm p-12 rounded-2xl shadow-xl border-4 border-double border-vintage-400 max-w-4xl w-full">
        <h1 className="text-6xl md:text-8xl font-bold font-display text-vintage-900 mb-6 tracking-tight drop-shadow-sm">
          PokéWiki
        </h1>
        <p className="text-xl md:text-2xl text-vintage-700 font-body italic max-w-2xl mx-auto mb-12 border-b border-vintage-400 pb-8">
          An encyclopedia of pocket monsters, items, and elemental types.
        </p>

        <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full">
          <Link to="/items" className="flex-1 group">
            <div className="h-full p-8 bg-vintage-100 rounded-lg border border-vintage-300 shadow-md hover:shadow-2xl transition-all duration-500 hover:bg-white transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold font-display text-vintage-900 mb-2 group-hover:text-vintage-accent">
                Items
              </h2>
              <p className="text-vintage-600 font-sans text-sm">
                Key objects and tools.
              </p>
            </div>
          </Link>

          <Link to="/pokemon" className="flex-1 group">
            <div className="h-full p-8 bg-vintage-100 rounded-lg border border-vintage-300 shadow-md hover:shadow-2xl transition-all duration-500 hover:bg-white transform hover:-translate-y-1">
              <h2 className="text-3xl font-display font-bold mb-3 text-tcg-yellow tracking-wider">
                Pokédex
              </h2>
              <p className="text-vintage-600 font-sans text-sm">
                Browse the complete card collection.
              </p>
            </div>
          </Link>

          <Link to="/types" className="flex-1 group">
            <div className="h-full p-8 bg-vintage-100 rounded-lg border border-vintage-300 shadow-md hover:shadow-2xl transition-all duration-500 hover:bg-white transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold font-display text-vintage-900 mb-2 group-hover:text-vintage-accent">
                Types
              </h2>
              <p className="text-vintage-600 font-sans text-sm">
                Elemental charts.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
