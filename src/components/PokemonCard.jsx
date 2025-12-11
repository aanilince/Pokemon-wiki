import React from 'react';
import { Link } from 'react-router-dom';

const PokemonCard = ({ name, url }) => {
  const id = url.split('/').filter(Boolean).pop();
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link to={`/pokemon/${id}`} className="block group">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
        <div className="w-32 h-32 mb-4 relative">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-contain grayscale-0 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
        <span className="text-gray-400 text-xs font-mono mb-1">#{id.padStart(3, '0')}</span>
        <h3 className="text-lg font-bold capitalize text-gray-900 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
      </div>
    </Link>
  );
};

export default PokemonCard;
