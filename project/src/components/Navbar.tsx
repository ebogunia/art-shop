import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();
  const cartItems = useCartStore((state) => state.items);
  
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="text-2xl font-bold text-purple-900">
            ArtPrints
          </Link>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-neutral-800 hover:text-purple-700 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-neutral-800 hover:text-purple-700 transition-colors">
              Shop
            </Link>
            <Link to="/cart" className="relative text-neutral-800 hover:text-purple-700 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/login" className="text-neutral-800 hover:text-purple-700 transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-neutral-800" />
            ) : (
              <Menu className="h-6 w-6 text-neutral-800" />
            )}
          </button>
        </div>
        
        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 bg-white border-t border-neutral-100 slide-up">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="px-4 py-2 text-neutral-800 hover:bg-neutral-50">
                Home
              </Link>
              <Link to="/shop" className="px-4 py-2 text-neutral-800 hover:bg-neutral-50">
                Shop
              </Link>
              <Link to="/cart" className="px-4 py-2 text-neutral-800 hover:bg-neutral-50 flex items-center justify-between">
                <span>Cart</span>
                {itemCount > 0 && (
                  <span className="bg-purple-700 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </Link>
              <Link to="/login" className="px-4 py-2 text-neutral-800 hover:bg-neutral-50">
                Account
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;