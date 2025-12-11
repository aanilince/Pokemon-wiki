import React, { useState, useEffect } from 'react';
import { getPokemonList } from '../services/api';
import PokemonCard from '../components/PokemonCard';

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const data = await getPokemonList(limit, offset);
        setPokemon(prev => offset === 0 ? data.results : [...prev, ...data.results]);
      } catch (err) {
        setError('Failed to load Pokémon.');
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [offset]);

  const loadMore = () => {
    setOffset(prev => prev + limit);
  };

  const filteredPokemon = pokemon.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-8 animate-fadeIn">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold text-gray-900">
                Pokédex
            </h1>
            <div className="relative w-full md:w-96">
                <input 
                    type="text" 
                    placeholder="Search loaded Pokémon..." 
                    className="w-full bg-white border border-gray-300 text-gray-900 rounded-lg px-6 py-3 pl-12 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

      {error && <div className="bg-red-50 text-red-600 border border-red-200 rounded-lg p-4 text-center">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredPokemon.map((p, index) => (
          <PokemonCard key={`${p.name}-${index}`} name={p.name} url={p.url} />
        ))}
      </div>
      
      {filteredPokemon.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500">
            No Pokémon found matching "{searchTerm}"
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {!loading && !searchTerm && (
        <div className="text-center pt-8">
            <button 
                onClick={loadMore}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-10 rounded-lg transition-all shadow-sm hover:shadow-md"
            >
                Load More Pokémon
            </button>
        </div>
      )}
    </div>
  );
};
export default PokemonList;
