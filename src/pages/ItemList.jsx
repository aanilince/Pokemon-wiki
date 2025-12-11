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
            <h1 className="text-3xl font-bold text-gray-900">Items</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {items.map((item, idx) => (
                    <div key={`${item.name}-${idx}`} className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col items-center justify-center hover:border-blue-400 hover:shadow-md transition-all shadow-sm group">
                        <span className="capitalize font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors">{item.name.replace(/-/g, ' ')}</span>
                    </div>
                ))}
            </div>
             {loading && <div className="text-center py-8 text-gray-400">Loading...</div>}
             {!loading && (
                <div className="text-center pt-8">
                    <button 
                        onClick={() => setOffset(o => o + limit)} 
                        className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-10 rounded-lg transition-all shadow-sm hover:shadow-md"
                    >
                        Load More Items
                    </button>
                </div>
            )}
        </div>
    );
};
export default ItemList;
