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

    // Helper for type colors (vintage palette)
    const getTypeColor = (name) => {
        const colors = {
            normal:  'bg-[#A8A77A] border-[#C6C6A7]',
            fire:    'bg-[#CD5241] border-[#EAC2BE]', // Burnt red
            water:   'bg-[#547EAC] border-[#A8C5E5]', // Faded blue
            grass:   'bg-[#7B9F35] border-[#C3D99C]', // Olive
            electric:'bg-[#D6B132] border-[#F2E5A8]', // Mustard
            ice:     'bg-[#7BA6A8] border-[#CDDFE0]', // Teal gray
            fighting:'bg-[#98412C] border-[#D6AFA6]', // Brick
            poison:  'bg-[#86598D] border-[#D1BDD5]', // Muted purple
            ground:  'bg-[#BC9F58] border-[#E8DCC3]', // Sand
            flying:  'bg-[#8F8FC7] border-[#CDCDE6]', // Periwinkle
            psychic: 'bg-[#C15881] border-[#E8BDCE]', // Dusty pink
            bug:     'bg-[#99A637] border-[#DDE4AD]', // Moss
            rock:    'bg-[#9F8F56] border-[#D6CDAD]', // Stone
            ghost:   'bg-[#605681] border-[#BFB9D1]', // Shadow
            dragon:  'bg-[#604EBC] border-[#B9B0E5]', // Deep violet
            steel:   'bg-[#9FA0AD] border-[#D7D7DF]', // Iron
            fairy:   'bg-[#CF8FA1] border-[#ECCCCC]', // Rose
            dark:    'bg-[#52443C] border-[#A89E99]'  // Espresso
        };
        return colors[name] || 'bg-[#8A8A8A] border-[#BDBDBD]';
    };

    return (
        <div className="space-y-8 animate-fadeIn">
             <h1 className="text-3xl font-bold font-display text-vintage-900 border-b border-vintage-400/50 pb-4 inline-block">Elemental Types</h1>
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {types.map(type => (
                    <div 
                        key={type.name} 
                        className={`${getTypeColor(type.name)} p-6 rounded-sm shadow-md transform hover:translate-y-[-2px] hover:shadow-lg transition-all flex flex-col items-center justify-center border-double border-4 opacity-90 hover:opacity-100 group`}
                    >
                        <div className="w-8 h-8 mb-2 rounded-full bg-white/20 flex items-center justify-center border border-white/30 text-white/90 font-serif font-bold text-lg">
                            {type.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-white font-display uppercase font-bold tracking-widest text-xs text-shadow-sm">{type.name}</span>
                    </div>
                ))}
            </div>
             {loading && <div className="text-center py-8 text-vintage-400 font-body">Loading Types...</div>}
        </div>
    );
};
export default TypeList;
