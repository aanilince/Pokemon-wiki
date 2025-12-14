import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getItemDetail } from "../services/api";

const ItemDetail = () => {
  const { name } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getItemDetail(name);
        setItem(data);
      } catch (err) {
        setError("Item not found or no details available.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [name]);

  if (loading)
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vintage-accent mx-auto"></div>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 py-20 font-bold font-body">
        {error}
      </div>
    );
  if (!item) return null;

  // Find English effect entry
  const effectEntry = item.effect_entries.find((e) => e.language.name === "en");
  const description = effectEntry
    ? effectEntry.effect
    : "No description available.";
  const shortEffect = effectEntry
    ? effectEntry.short_effect
    : "No short effect available.";

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn font-body pb-12">
      {/* Header */}
      <div className="bg-vintage-100 p-6 rounded-t-sm border-2 border-vintage-300 shadow-lg text-center relative mt-8">
        <h1 className="text-3xl font-display font-bold text-vintage-900 capitalize tracking-wider">
          {item.name.replace(/-/g, " ")}
        </h1>
        <div className="absolute top-0 right-0 p-2 opacity-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border-x-2 border-b-2 border-vintage-300 p-8 shadow-md relative">
        <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
          {/* Sprite */}
          <div className="bg-vintage-50 p-8 rounded-full border-4 border-vintage-200 shadow-inner">
            {item.sprites.default ? (
              <img
                src={item.sprites.default}
                alt={item.name}
                className="w-24 h-24 object-contain pixelated"
              />
            ) : (
              <div className="w-24 h-24 flex items-center justify-center text-vintage-400 font-bold">
                No Img
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 space-y-3 w-full text-center md:text-left">
            <div className="bg-vintage-50 p-3 rounded border border-vintage-200">
              <span className="block text-xs font-bold uppercase text-vintage-500 tracking-widest mb-1">
                Category
              </span>
              <span className="text-lg font-bold text-vintage-800 capitalize">
                {item.category?.name.replace(/-/g, " ")}
              </span>
            </div>
            <div className="bg-vintage-50 p-3 rounded border border-vintage-200">
              <span className="block text-xs font-bold uppercase text-vintage-500 tracking-widest mb-1">
                Cost
              </span>
              <span className="text-lg font-bold text-tcg-dark font-mono">
                {item.cost > 0 ? `${item.cost} ₽` : "Not for sale"}
              </span>
            </div>
          </div>
        </div>

        {/* Description Box */}
        <div className="bg-tcg-paper p-6 rounded border border-vintage-300 shadow-inner mb-6 relative overflow-hidden">
          <div className="absolute top-2 left-2 right-2 bottom-2 bg-vintage-50 opacity-20 pointer-events-none"></div>
          <h3 className="font-display font-bold text-xl text-vintage-900 mb-2 relative z-10 border-b border-vintage-300 pb-2">
            Effect
          </h3>
          <p className="text-vintage-800 leading-relaxed italic relative z-10 mb-4 text-lg">
            {shortEffect}
          </p>
          <p className="text-vintage-700 text-sm leading-relaxed relative z-10">
            {description}
          </p>
        </div>

        {/* Attributes/Flags if any */}
        {item.attributes && item.attributes.length > 0 && (
          <div className="mb-6">
            <h3 className="font-bold text-sm text-vintage-500 uppercase tracking-widest mb-2">
              Attributes
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.attributes.map((attr) => (
                <span
                  key={attr.name}
                  className="px-3 py-1 bg-vintage-200 text-vintage-800 text-xs rounded-full font-bold uppercase border border-vintage-300"
                >
                  {attr.name.replace(/-/g, " ")}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/items"
          className="inline-block px-8 py-3 bg-vintage-800 text-vintage-50 rounded-sm font-display font-bold uppercase tracking-wider shadow-lg hover:bg-vintage-900 hover:-translate-y-1 transition-all border-2 border-transparent"
        >
          Back to Items
        </Link>
      </div>
    </div>
  );
};

export default ItemDetail;
