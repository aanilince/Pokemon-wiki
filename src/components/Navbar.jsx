import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-tcg-blue border-b-4 border-tcg-yellow shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        <Link
          to="/"
          className="text-3xl font-display font-bold text-vintage-50 tracking-widest hover:text-tcg-holofoil transition-colors drop-shadow-md z-50"
          onClick={() => setIsMenuOpen(false)}
        >
          PokeWiki
          <span className="text-xs block font-sans font-normal tracking-normal text-vintage-200 opacity-80">
            Trainer's Compendium
          </span>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-vintage-50 focus:outline-none z-50"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            )}
          </svg>
        </button>

        {/* Links Container */}
        <div
          className={`${
            isMenuOpen
              ? "flex flex-col absolute top-full left-0 w-full bg-tcg-blue border-b-4 border-tcg-yellow shadow-lg p-6 space-y-4"
              : "hidden"
          } md:flex md:flex-row md:static md:w-auto md:bg-transparent md:border-none md:shadow-none md:p-0 md:space-y-0 md:space-x-6 items-center transition-all duration-300 ease-in-out`}
        >
          <Link
            to="/pokemon"
            onClick={() => setIsMenuOpen(false)}
            className="w-full text-center md:w-auto px-4 py-2 md:py-1 rounded-full bg-black/20 text-vintage-100 font-bold border border-white/10 hover:bg-tcg-yellow hover:text-tcg-dark hover:border-tcg-yellow transition-all uppercase text-sm tracking-wider"
          >
            Pokedex
          </Link>
          <Link
            to="/items"
            onClick={() => setIsMenuOpen(false)}
            className="w-full text-center md:w-auto px-4 py-2 md:py-1 rounded-full bg-black/20 text-vintage-100 font-bold border border-white/10 hover:bg-tcg-yellow hover:text-tcg-dark hover:border-tcg-yellow transition-all uppercase text-sm tracking-wider"
          >
            Items
          </Link>
          <Link
            to="/types"
            onClick={() => setIsMenuOpen(false)}
            className="w-full text-center md:w-auto px-4 py-2 md:py-1 rounded-full bg-black/20 text-vintage-100 font-bold border border-white/10 hover:bg-tcg-yellow hover:text-tcg-dark hover:border-tcg-yellow transition-all uppercase text-sm tracking-wider"
          >
            Types
          </Link>
          <Link
            to="/favorites"
            onClick={() => setIsMenuOpen(false)}
            className="w-full text-center justify-center md:justify-start md:w-auto px-4 py-2 md:py-1 rounded-full bg-black/20 text-vintage-100 font-bold border border-white/10 hover:bg-red-500 hover:text-white hover:border-red-400 transition-all uppercase text-sm tracking-wider flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span>Favorites</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
