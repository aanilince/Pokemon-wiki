import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  getPokemonList,
  getPokemonByType,
  getPokemonDetail,
} from "../services/api";
import PokemonCard from "../components/PokemonCard";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [searchTerm, setSearchTerm] = useState("");
  const [isDbSearchCallback, setIsDbSearchCallback] = useState(false);

  const [searchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");

  const handleDbSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);
      // API expects lowercase name or ID
      const data = await getPokemonDetail(searchTerm.toLowerCase().trim());

      // Construct a pokemon object compatible with the list view (name + url with ID)
      const mockUrl = `https://pokeapi.co/api/v2/pokemon/${data.id}/`;
      const result = [{ name: data.name, url: mockUrl }];

      setPokemon(result);
      setIsDbSearchCallback(true);
    } catch (err) {
      console.error(err);
      setError(`Pokemon "${searchTerm}" not found in Database.`);
      setPokemon([]); // Clear list on error or keep previous? Clearing makes it obvious it failed to find THAT specific one.
    } finally {
      setLoading(false);
    }
  };

  // Reset state when type filter changes
  useEffect(() => {
    setPokemon([]);
    setOffset(0);
    setIsDbSearchCallback(false);
    setSearchTerm(""); // Optionally clear search term
  }, [typeFilter]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        if (typeFilter) {
          // Fetch by type
          const data = await getPokemonByType(typeFilter);
          // extract pokemon object from type response structure
          const formatted = data.pokemon.map((p) => p.pokemon);
          setPokemon(formatted);
        } else {
          // Fetch default list
          const data = await getPokemonList(limit, offset);
          setPokemon((prev) =>
            offset === 0 ? data.results : [...prev, ...data.results]
          );
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load Pokémon.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [offset, typeFilter]);

  const loadMore = () => {
    setOffset((prev) => prev + limit);
  };

  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b-2 border-vintage-200 pb-6">
        <h1 className="text-3xl font-bold font-display text-vintage-900">
          {typeFilter
            ? `${
                typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)
              } Pokémon`
            : "Pokédex"}
        </h1>

        {typeFilter && (
          <Link
            to="/pokemon"
            className="text-sm text-vintage-600 hover:text-vintage-accent underline decoration-dotted"
          >
            Clear Filter
          </Link>
        )}

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search loaded Pokémon..."
              className="w-full bg-tcg-paper border-4 border-vintage-400 text-tcg-dark rounded-sm px-6 py-3 pl-12 focus:border-tcg-blue focus:ring-0 outline-none transition-all placeholder-vintage-500 font-bold font-mono shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleDbSearch();
              }}
            />
            <svg
              className="w-5 h-5 text-vintage-500 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={handleDbSearch}
            className="px-6 py-3 bg-tcg-blue text-white font-bold font-display rounded-sm border-2 border-tcg-blue hover:bg-blue-700 hover:border-blue-700 transition-all shadow-md whitespace-nowrap"
          >
            Search in DB
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-800 border-2 border-red-200 rounded-sm p-4 text-center font-body">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredPokemon.map((p, index) => (
          <PokemonCard key={`${p.name}-${index}`} name={p.name} url={p.url} />
        ))}
      </div>

      {filteredPokemon.length === 0 && !loading && (
        <div className="text-center py-12 text-vintage-500 font-body italic">
          No Pokémon found matching "{searchTerm}"
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-vintage-accent"></div>
        </div>
      )}

      {!loading && !searchTerm && !typeFilter && !isDbSearchCallback && (
        <div className="text-center pt-8">
          <button
            onClick={loadMore}
            className="bg-vintage-100 border-2 border-vintage-300 hover:bg-vintage-200 text-vintage-800 font-display font-bold py-3 px-10 rounded-sm transition-all shadow-[4px_4px_0px_0px_rgba(140,123,117,0.3)] hover:shadow-none hover:translate-y-[2px]"
          >
            Load More Pokémon
          </button>
        </div>
      )}
    </div>
  );
};
export default PokemonList;
