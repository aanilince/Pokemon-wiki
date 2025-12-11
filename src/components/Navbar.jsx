import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight hover:text-blue-600 transition-colors">
          PokeWiki
        </Link>
        <div className="flex space-x-8 text-gray-600 font-medium">
          <Link to="/pokemon" className="hover:text-blue-600 transition-colors">
            Pokedex
          </Link>
          <Link to="/items" className="hover:text-blue-600 transition-colors">
            Items
          </Link>
          <Link to="/types" className="hover:text-blue-600 transition-colors">
            Types
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
