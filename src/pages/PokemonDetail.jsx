import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getPokemonDetail } from "../services/api";
import noImage from "/images/no-image.png";

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
        setError("Failed to load details.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 py-20">{error}</div>;
  if (!pokemon) return null;

  return (
    <div className="max-w-4xl mx-auto animate-slideUp font-body">
      {/* Card Header Effect */}
      <div className="bg-tcg-yellow p-4 rounded-t-xl shadow-lg relative z-20 mx-4 mt-4 border-b-2 border-yellow-600/20">
        <div className="flex flex-col md:flex-row justify-between items-center text-tcg-dark gap-4 md:gap-0">
          <h1 className="text-4xl font-bold font-display tracking-tight ml-2 text-center md:text-left">
            {pokemon.name}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold text-red-700 text-xl font-mono">
              <span className="text-xs text-tcg-dark mr-1">LV</span>
              {Math.floor(Math.random() * 50) + 20}
            </span>
            {pokemon.types.map((t) => (
              <span
                key={t.type.name}
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/50 border border-black/10"
              >
                {t.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-vintage-100 to-vintage-200 rounded-b-xl shadow-2xl border-4 border-tcg-yellow relative z-10 overflow-hidden mx-4 pb-8">
        {/* Top Section: Image & Basic Info */}
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Image Frame */}
          <div className="bg-white p-4 shadow-inner border-[6px] border-vintage-300 relative paper-texture">
            <div className="absolute top-2 left-2 right-2 bottom-2 bg-vintage-50 opacity-40 -z-10"></div>
            <img
              src={
                pokemon?.sprites?.other?.["official-artwork"]?.front_default ??
                pokemon?.sprites?.front_default ??
                noImage
              }
              alt={pokemon.name}
              className="w-full h-auto object-contain filter drop-shadow-xl sepia-[0.2]"
            />
            <div className="absolute -bottom-6 -right-4 bg-tcg-yellow text-tcg-dark font-bold px-3 py-1 text-xs border border-black/10 rotate-1 shadow-sm">
              No. {pokemon.id}
            </div>
          </div>

          {/* Stats & Info Block */}
          <div className="space-y-6 pt-4">
            <div className="bg-tcg-paper/40 p-4 rounded border border-vintage-300 shadow-sm">
              <h2 className="text-sm font-bold uppercase text-tcg-dark mb-3 tracking-widest border-b border-vintage-400 pb-1 opacity-70">
                Base Stats
              </h2>
              <div className="space-y-3">
                {pokemon.stats.map((s) => (
                  <div
                    key={s.stat.name}
                    className="flex items-center gap-2 text-xs"
                  >
                    <span className="w-24 font-bold uppercase text-gray-600 text-[0.65rem]">
                      {s.stat.name.replace("-", " ")}
                    </span>
                    <div className="flex-grow bg-white h-2 rounded-sm border border-vintage-300 overflow-hidden">
                      <div
                        className="bg-tcg-red h-full"
                        style={{
                          width: `${Math.min(s.base_stat / 2.55, 100)}%`,
                        }}
                      ></div>
                    </div>
                    <span className="w-8 text-right font-mono font-bold text-gray-800">
                      {s.base_stat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between gap-4 text-center">
              <div className="flex-1 bg-white/50 p-2 rounded border border-vintage-200">
                <div className="text-[0.6rem] font-bold uppercase text-gray-400">
                  Height
                </div>
                <div className="font-bold text-lg text-tcg-dark">
                  {pokemon.height / 10} m
                </div>
              </div>
              <div className="flex-1 bg-white/50 p-2 rounded border border-vintage-200">
                <div className="text-[0.6rem] font-bold uppercase text-gray-400">
                  Weight
                </div>
                <div className="font-bold text-lg text-tcg-dark">
                  {pokemon.weight / 10} kg
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: Abilities (Moves style) */}
        <div className="px-8 pb-4">
          <div className="border-t-2 border-vintage-300 pt-6">
            <h3 className="text-center font-display font-bold text-xl text-tcg-dark mb-6 italic opacity-70">
              Abilities & Attributes
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {pokemon.abilities.map((a) => (
                <div
                  key={a.ability.name}
                  className="flex items-start gap-4 p-3 hover:bg-white/30 rounded transition-colors group cursor-default"
                >
                  <div className="mt-1 w-6 h-6 rounded-full border-2 border-tcg-dark/20 flex items-center justify-center bg-white shadow-sm">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        a.is_hidden ? "bg-purple-800" : "bg-tcg-red"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <div className="font-bold text-lg capitalize text-tcg-dark group-hover:text-tcg-red transition-colors">
                      {a.ability.name.replace("-", " ")}
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      {a.is_hidden
                        ? "Hidden Ability. Rare and powerful."
                        : "Standard Ability. Commonly observed in the wild."}
                    </p>
                  </div>
                  <div className="ml-auto font-mono text-xl font-bold text-tcg-dark opacity-40">
                    {Math.floor(Math.random() * 30) + 10}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-8 text-center mt-4">
          <div className="text-[0.6rem] text-gray-500 italic border-t border-vintage-300 pt-2">
            © 1995, 96, 98 Nintendo, Creatures, GAMEFREAK. © 1999 Wizards.
          </div>
        </div>
      </div>

      <div className="p-6 text-center">
        <Link
          to="/pokemon"
          className="inline-block px-8 py-3 bg-tcg-red text-white rounded-full font-bold shadow-lg hover:bg-red-900 hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-white/20"
        >
          Close Dossier
        </Link>
      </div>
    </div>
  );
};
export default PokemonDetail;
