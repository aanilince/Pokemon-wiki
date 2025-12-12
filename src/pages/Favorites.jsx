import React from "react";
import { useFavorites } from "../context/FavoritesContext";
import PokemonCard from "../components/PokemonCard";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="space-y-8 animate-fadeIn">
      <h1 className="text-3xl font-bold font-display text-vintage-900 border-b-2 border-vintage-200 pb-4">
        My Favorites Collection
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white/50 rounded-lg border-2 border-dashed border-vintage-300 text-center">
          <p className="text-xl text-vintage-600 font-body mb-6">
            You haven't added any Pokémon to your favorites yet.
          </p>
          <Link
            to="/pokemon"
            className="px-8 py-3 bg-vintage-100 border-2 border-vintage-300 hover:bg-vintage-200 text-vintage-800 font-display font-bold rounded-sm transition-all shadow-[4px_4px_0px_0px_rgba(140,123,117,0.3)] hover:shadow-none hover:translate-y-[2px]"
          >
            Browse Pokedex
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((id) => (
            <PokemonCard
              key={id}
              // Construct URL expected by PokemonCard to parse ID
              url={`https://pokeapi.co/api/v2/pokemon/${id}`}
              // Name will be fetched by PokemonCard internally since we don't pass it
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
