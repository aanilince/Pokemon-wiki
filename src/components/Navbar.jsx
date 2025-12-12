import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-tcg-blue border-b-4 border-tcg-yellow shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-3xl font-display font-bold text-vintage-50 tracking-widest hover:text-tcg-holofoil transition-colors drop-shadow-md">
          PokeWiki
          <span className="text-xs block font-sans font-normal tracking-normal text-vintage-200 opacity-80">Trainer's Compendium</span>
        </Link>
        <div className="flex space-x-6">
          <Link to="/pokemon" className="px-4 py-1 rounded-full bg-black/20 text-vintage-100 font-bold border border-white/10 hover:bg-tcg-yellow hover:text-tcg-dark hover:border-tcg-yellow transition-all uppercase text-sm tracking-wider">
            Pokedex
          </Link>
          <Link to="/items" className="px-4 py-1 rounded-full bg-black/20 text-vintage-100 font-bold border border-white/10 hover:bg-tcg-yellow hover:text-tcg-dark hover:border-tcg-yellow transition-all uppercase text-sm tracking-wider">
            Items
          </Link>
          <Link to="/types" className="px-4 py-1 rounded-full bg-black/20 text-vintage-100 font-bold border border-white/10 hover:bg-tcg-yellow hover:text-tcg-dark hover:border-tcg-yellow transition-all uppercase text-sm tracking-wider">
            Types
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
