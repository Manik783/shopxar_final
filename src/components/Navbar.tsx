import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#fff4e2]/95 border-b border-[#3d3938]/10 shadow-sm">
      <div className="container mx-auto px-8 flex items-center justify-between h-15">
        
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-[#3d3938] text-4xl md:text-5xl font-bold tracking-tight">
            Shopxar
          </span>
        </div>
 
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-12">
          <a href="#about" className="text-[#3d3938]/80 text-lg font-medium hover:text-[#3d3938] transition-colors">
            About
          </a>
          <a href="#features" className="text-[#3d3938]/80 text-lg font-medium hover:text-[#3d3938] transition-colors">
            Features
          </a>
          <a href="#contact" className="text-[#3d3938]/80 text-lg font-medium hover:text-[#3d3938] transition-colors">
            Contact
          </a>
          <button className="bg-[#3d3938] text-[#fff4e2] px-6 py-1.5 rounded-lg text-lg font-medium hover:bg-[#677870] transition-all hover:shadow-md">
            Get Started
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-[#3d3938]/5 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-[#3d3938]" />
          ) : (
            <Menu className="w-6 h-6 text-[#3d3938]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 top-20 bg-[#fff4e2]/95 border-b border-[#3d3938]/10 shadow-lg">
          <div className="flex flex-col space-y-4 px-8 py-6">
            <a 
              href="#about" 
              className="text-[#3d3938]/80 text-base font-medium hover:text-[#3d3938] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#features" 
              className="text-[#3d3938]/80 text-base font-medium hover:text-[#3d3938] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#contact" 
              className="text-[#3d3938]/80 text-base font-medium hover:text-[#3d3938] transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <button className="bg-[#3d3938] text-[#fff4e2] w-full px-6 py-3 rounded-lg text-base font-medium hover:bg-[#677870] transition-all hover:shadow-md mt-2">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
