import React, { useState, useEffect } from 'react';
import { getTypeList } from '../services/api';

const TypeList = () => {
    const [types, setTypes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTypes = async () => {
            const data = await getTypeList();
            setTypes(data.results);
            setLoading(false);
        };
        fetchTypes();
    }, []);

    // Helper for type colors (optional visual enhancement)
    const getTypeColor = (name) => {
        const colors = {
            normal: 'bg-neutral-500',
            fire: 'bg-orange-600',
            water: 'bg-blue-600',
            grass: 'bg-green-600',
            electric: 'bg-yellow-500',
            ice: 'bg-cyan-400',
            fighting: 'bg-red-700',
            poison: 'bg-purple-600',
            ground: 'bg-yellow-700',
            flying: 'bg-indigo-400',
            psychic: 'bg-pink-600',
            bug: 'bg-lime-600',
            rock: 'bg-amber-700',
            ghost: 'bg-violet-800',
            dragon: 'bg-indigo-700',
            steel: 'bg-slate-500',
            fairy: 'bg-pink-400',
            dark: 'bg-slate-800'
        };
        return colors[name] || 'bg-slate-700';
    };

    return (
        <div className="space-y-8 animate-fadeIn">
             <h1 className="text-3xl font-bold text-gray-900">Elemental Types</h1>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {types.map(type => (
                    <div 
                        key={type.name} 
                        className={`${getTypeColor(type.name)} p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform flex items-center justify-center border border-white/20`}
                    >
                        <span className="text-white uppercase font-bold tracking-wider text-sm text-shadow-sm opacity-95">{type.name}</span>
                    </div>
                ))}
            </div>
             {loading && <div className="text-center py-8 text-gray-400">Loading Types...</div>}
        </div>
    );
};
export default TypeList;
