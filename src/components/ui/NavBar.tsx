import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogoIcon } from "@/icon/IconsAll";
import { Button } from "@/components/ui/Button";

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <nav className="bg-white border-b border-brown-300">
      <div className="max-w-[1200px] mx-auto w-full">
        <div className="flex justify-between items-center px-4 py-4">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="text-xl font-semibold text-brown-500 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <LogoIcon className="w-[44px] h-[44px]" />
          </button>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-2">
            <Button 
              onClick={handleLoginClick}
              variant="secondary"
              size="lg"
            >
              Log in
            </Button>
            <Button 
              onClick={handleSignUpClick}
              variant="default"
              size="lg"
              className="!text-white"
            >
              Sign up
            </Button>
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
            <Button 
              onClick={handleLoginClick}
              variant="secondary"
              size="lg"
              className="w-full"
            >
              Log in
            </Button>
            <Button 
              onClick={handleSignUpClick}
              variant="default"
              size="lg"
              className="w-full !text-white"
            >
              Sign up
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

