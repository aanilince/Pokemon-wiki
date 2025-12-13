import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import imagebg from "/images/bg3.png";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen text-tcg-dark relative transition-all duration-1000 ease-in-out">
      {/* Background Image Layer with Overlay */}
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{
          backgroundImage: `url(${imagebg})`,
        }}
      >
        {/* Vintage Overlay to blend any image nicely */}
        <div className="absolute inset-0 bg-vintage-100/80 bg-blend-multiply backdrop-blur-[2px]"></div>
      </div>

      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-20 relative z-10">
        {children}
      </main>

      <footer className="text-center py-8 text-vintage-800 font-display text-sm border-t border-vintage-900/10 mt-auto bg-vintage-50/80 backdrop-blur-sm relative z-10">
        © 2025 PokéWiki. carefully curated data.
      </footer>
    </div>
  );
};

export default Layout;
