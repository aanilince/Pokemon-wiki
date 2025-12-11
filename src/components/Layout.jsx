import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navbar />
      <main className="container mx-auto px-4 pt-28 pb-12">
        {children}
      </main>
      <footer className="text-center py-6 text-slate-500 text-sm">
        © 2025 PokéWiki. Data provided by PokéAPI.
      </footer>
    </div>
  );
};

export default Layout;
