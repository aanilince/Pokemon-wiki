import React, { useState, useEffect } from 'react';
import { getItemsList } from '../services/api';

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [offset, setOffset] = useState(0);
    const limit = 20;

    useEffect(() => {
        loadItems();
    }, [offset]);

    const loadItems = async () => {
        try {
            setLoading(true);
            const data = await getItemsList(limit, offset);
             if (offset === 0) {
                setItems(data.results);
            } else {
                setItems(prev => [...prev, ...data.results]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-fadeIn">
            <h1 className="text-3xl font-bold font-display text-vintage-900">Items</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {items.map((item, idx) => (
                    <div key={`${item.name}-${idx}`} className="bg-vintage-50 p-6 rounded-sm border-2 border-vintage-200 flex flex-col items-center justify-center hover:border-vintage-accent hover:shadow-[4px_4px_0px_0px_rgba(192,86,33,0.4)] transition-all shadow-[2px_2px_0px_0px_rgba(140,123,117,0.3)] group hover:-translate-y-1">
                        <span className="capitalize font-medium font-body text-vintage-700 text-center group-hover:text-vintage-accent transition-colors">{item.name.replace(/-/g, ' ')}</span>
                    </div>
                ))}
            </div>
             {loading && <div className="text-center py-8 text-vintage-400 font-body">Loading...</div>}
             {!loading && (
                <div className="text-center pt-8">
                    <button 
                        onClick={() => setOffset(o => o + limit)} 
                        className="bg-vintage-100 border-2 border-vintage-300 hover:bg-vintage-200 text-vintage-800 font-display font-bold py-3 px-10 rounded-sm transition-all shadow-[4px_4px_0px_0px_rgba(140,123,117,0.3)] hover:shadow-none hover:translate-y-[2px]"
                    >
                        Load More Items
                    </button>
                </div>
            )}
        </div>
    );
};
export default ItemList;
