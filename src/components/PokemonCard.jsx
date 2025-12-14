import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPokemonDetail, getPokemonSpecies } from "../services/api";
import { useFavorites } from "../context/FavoritesContext";
import noImage from "/images/no-image.png";

const PokemonCard = ({ name, url }) => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const id = url.split("/").filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  const [hp, setHp] = useState(null);
  const [description, setDescription] = useState("Loading...");
  const [displayName, setDisplayName] = useState(name);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const detailData = await getPokemonDetail(id);
        const hpStat = detailData.stats.find((s) => s.stat.name === "hp");

        if (isMounted) {
          if (hpStat) setHp(hpStat.base_stat);
          if (!name) setDisplayName(detailData.name);
          setLevel(Math.floor(detailData.base_experience / 2.55));
        }

        const speciesData = await getPokemonSpecies(id);
        const flavorText = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === "en"
        );

        if (isMounted) {
          // Clean up the text (remove newlines/form feeds)
          const cleanText = flavorText
            ? flavorText.flavor_text.replace(/[\n\f]/g, " ")
            : "No description available.";
          setDescription(cleanText);
        }
      } catch (error) {
        console.error("Failed to fetch pokemon data", error);
        if (isMounted) {
          setHp("??");
          setDescription("A mysterious Pokemon!");
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id, name]);

  return (
    <Link
      to={`/pokemon/${id}`}
      className="block group relative transform hover:-translate-y-2 hover:rotate-1 transition-all duration-300"
    >
      {/* Card Outer Border (Neutral/Silver) */}
      <div className="bg-gray-200 p-2 rounded-xl shadow-xl relative z-10 transition-colors group-hover:bg-vintage-200">
        {/* Card Inner Content */}
        <div className="bg-gradient-to-br from-vintage-50 to-vintage-100 p-2 rounded-lg border border-gray-400/30 h-full flex flex-col">
          {/* Header: Name & HP */}
          <div className="flex justify-between items-center mb-1 px-1">
            <h3 className="text-sm font-bold font-display capitalize text-tcg-dark tracking-tight">
              {displayName || "..."}
            </h3>
            <span className="text-xs font-bold text-red-700 font-mono">
              <span className="text-[0.6rem] text-tcg-dark">HP</span>
              {hp !== null ? hp : ".."}
            </span>
          </div>

          {/* Image Window */}
          <div className="bg-white border-4 border-vintage-300 shadow-inner mb-2 relative aspect-square overflow-hidden mx-1">
            {/* Background flair behind pokemon */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 to-purple-100/50 opacity-50"></div>

            {/* Favorite Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(id);
              }}
              className="absolute top-1 right-1 z-20 p-1.5 bg-white/80 rounded-full hover:bg-white transition-all transform hover:scale-110 shadow-sm group/heart"
            >
              <svg
                className={`w-4 h-4 transition-colors duration-300 ${
                  isFavorite(id)
                    ? "text-red-500 fill-current"
                    : "text-gray-400 fill-none group-hover/heart:text-red-400"
                }`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-contain p-2 relative z-10 filter contrast-125 sepia-[0.1]"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src = noImage;
              }}
            />
            <span className="absolute bottom-1 right-1 text-[0.6rem] font-bold text-gray-400 bg-white/80 px-1 rounded-sm">
              No. {id}
            </span>
          </div>

          {/* Flavor Text / Info Area */}
          <div className="bg-tcg-paper/50 flex-grow border border-vintage-300 p-2 rounded-sm text-[0.65rem] leading-tight text-tcg-dark font-sans text-justify shadow-sm">
            <p className="italic opacity-80 mb-1 line-clamp-4">{description}</p>
            <div className="border-t border-vintage-400/30 pt-1 mt-1 flex justify-center gap-2">
              <span className="font-bold text-[0.55rem] uppercase text-gray-500">
                LV.{level}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stack effect behind card */}
      <div className="absolute inset-0 bg-tcg-blue rounded-xl transform translate-x-1 translate-y-1 -z-10 opacity-20 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
    </Link>
  );
};

export default PokemonCard;
