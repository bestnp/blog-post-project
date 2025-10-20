import React, { useState } from "react";
import { LogoIcon } from "@/icon/IconsAll";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-brown-300">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <div className="text-xl font-semibold text-brown-500">
            <LogoIcon className="w-[44px] h-[44px]" />
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            <button className="h-[48px] px-[40px] text-body-lg text-brown-600 rounded-full border border-brown-400 bg-white shadow-sm">
              Log in
            </button>
            <button className="h-[48px] px-[40px] text-body-lg text-brown-600 rounded-full bg-brown-600 text-white shadow-sm">
              Sign up
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <button 
            className="md:hidden flex flex-col space-y-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="w-6 h-0.5 bg-brown-600"></span>
            <span className="w-6 h-0.5 bg-brown-600"></span>
            <span className="w-6 h-0.5 bg-brown-600"></span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-brown-300 bg-white px-4 py-4 space-y-3">
            <button className="w-full h-[48px] px-[40px] text-body-lg text-brown-600 rounded-full border border-brown-400 bg-white shadow-sm">
              Log in
            </button>
            <button className="w-full h-[48px] px-[40px] text-body-lg text-brown-600 rounded-full bg-brown-600 text-white shadow-sm">
              Sign up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

