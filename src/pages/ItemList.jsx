import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getItemsList, getItemDetail } from "../services/api";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const limit = 20;
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

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
        setItems((prev) => [...prev, ...data.results]);
      }
    } catch (e) {
      console.error(e);
      setError("Failed to load items.");
    } finally {
      setLoading(false);
    }
  };

  const handleDbSearch = async () => {
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError(null);

      // API expects kebab-case or ID usually, but name is standard
      // user might type "potion", API has "potion"
      // user might type "super potion", API has "super-potion"
      const query = searchTerm.toLowerCase().trim().replace(/ /g, "-");

      const data = await getItemDetail(query);

      // Create a compatible item object
      const result = [
        { name: data.name, url: `https://pokeapi.co/api/v2/item/${data.id}/` },
      ];

      setItems(result);
    } catch (err) {
      console.error(err);
      setError(`Item "${searchTerm}" not found in Database.`);
      // Optionally clear items or keep them. Let's keep them empty to show failure clearly or maybe just show the error above the list.
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter((item) =>
    item.name
      .replace(/-/g, " ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b-2 border-vintage-200 pb-6">
        <h1 className="text-3xl font-bold font-display text-vintage-900">
          Items
        </h1>

        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search loaded Items..."
              className="w-full bg-tcg-paper border-4 border-vintage-400 text-tcg-dark rounded-sm px-6 py-3 pl-12 focus:border-tcg-blue focus:ring-0 outline-none transition-all placeholder-vintage-500 font-bold font-mono shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleDbSearch();
              }}
            />
            <svg
              className="w-5 h-5 text-vintage-500 absolute left-4 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={handleDbSearch}
            className="px-6 py-3 bg-tcg-blue text-white font-bold font-display rounded-sm border-2 border-tcg-blue hover:bg-blue-700 hover:border-blue-700 transition-all shadow-md whitespace-nowrap"
          >
            Search in DB
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-800 border-2 border-red-200 rounded-sm p-4 text-center font-body">
          {error}
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredItems.map((item, idx) => (
          <Link
            to={`/items/${item.name}`}
            key={`${item.name}-${idx}`}
            className="bg-vintage-50 p-6 rounded-sm border-2 border-vintage-200 flex flex-col items-center justify-center hover:border-vintage-accent hover:shadow-[4px_4px_0px_0px_rgba(192,86,33,0.4)] transition-all shadow-[2px_2px_0px_0px_rgba(140,123,117,0.3)] group hover:-translate-y-1 cursor-pointer block"
          >
            <span className="capitalize font-medium font-body text-vintage-700 text-center group-hover:text-vintage-accent transition-colors">
              {item.name.replace(/-/g, " ")}
            </span>
          </Link>
        ))}
      </div>

      {filteredItems.length === 0 && !loading && (
        <div className="text-center py-12 text-vintage-500 font-body italic">
          No Items found matching "{searchTerm}"
        </div>
      )}

      {loading && (
        <div className="text-center py-8 text-vintage-400 font-body">
          Loading...
        </div>
      )}

      {!loading && !searchTerm && items.length > 0 && (
        <div className="text-center pt-8">
          <button
            onClick={() => setOffset((o) => o + limit)}
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
