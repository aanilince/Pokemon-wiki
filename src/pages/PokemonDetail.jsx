import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPokemonDetail } from '../services/api';

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getPokemonDetail(id);
        setPokemon(data);
      } catch (err) {
        setError('Failed to load details.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div></div>;
  if (error) return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!pokemon) return null;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-slideUp">
        <div className="bg-gray-50 p-8 text-center relative border-b border-gray-100">
            <h1 className="text-4xl font-bold text-gray-900 capitalize mb-2">{pokemon.name}</h1>
            <div className="flex justify-center gap-3 mb-6">
                {pokemon.types.map(t => (
                    <span key={t.type.name} className="px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide bg-white text-gray-700 border border-gray-200 shadow-sm">
                        {t.type.name}
                    </span>
                ))}
            </div>
            <div className="w-64 h-64 mx-auto mb-4 relative z-10">
                 <img 
                    src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
                    alt={pokemon.name}
                    className="w-full h-full object-contain filter drop-shadow-md"
                />
            </div>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Base Stats</h2>
                <div className="space-y-4">
                    {pokemon.stats.map(s => (
                        <div key={s.stat.name}>
                            <div className="flex justify-between text-gray-500 text-sm mb-1 uppercase font-semibold">
                                <span>{s.stat.name.replace('-', ' ')}</span>
                                <span className="text-gray-900">{s.base_stat}</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                                <div 
                                    className="bg-blue-500 h-2 rounded-full" 
                                    style={{ width: `${Math.min(s.base_stat / 2.55, 100)}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                 <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Info</h2>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="block text-gray-400 text-xs uppercase mb-1 font-bold">Height</span>
                        <span className="text-lg font-bold text-gray-900">{pokemon.height / 10} m</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="block text-gray-400 text-xs uppercase mb-1 font-bold">Weight</span>
                        <span className="text-lg font-bold text-gray-900">{pokemon.weight / 10} kg</span>
                    </div>
                     <div className="col-span-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="block text-gray-400 text-xs uppercase mb-1 font-bold">Abilities</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                             {pokemon.abilities.map(a => (
                                <span key={a.ability.name} className="bg-white px-3 py-1 rounded-md text-sm capitalize text-gray-700 border border-gray-200">
                                    {a.ability.name.replace('-', ' ')}
                                </span>
                            ))}
                        </div>
                    </div>
                 </div>
            </div>
        </div>
        
        <div className="p-6 text-center border-t border-gray-100 bg-gray-50">
            <Link to="/pokemon" className="inline-block text-gray-600 hover:text-blue-600 font-medium transition-colors">
                ← Back to Pokédex
            </Link>
        </div>
    </div>
  );
};
export default PokemonDetail;
