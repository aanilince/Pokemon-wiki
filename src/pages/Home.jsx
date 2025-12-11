import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
        PokeWiki
      </h1>
      <p className="text-xl text-gray-500 max-w-2xl mb-12">
        Your ultimate guide to the Pokémon universe. Minimal, clean, and fast.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <Link to="/pokemon" className="block p-8 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Pokédex</h2>
          <p className="text-gray-500">
            Browse all Pokémon species, view their stats and abilities.
          </p>
        </Link>
        <Link to="/items" className="block p-8 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Items</h2>
          <p className="text-gray-500">
             Discover a vast collection of items, berries, and machines.
          </p>
        </Link>
        <Link to="/types" className="block p-8 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold mb-2 text-gray-900">Types</h2>
          <p className="text-gray-500">
             Understand type matchups and elemental advantages.
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
