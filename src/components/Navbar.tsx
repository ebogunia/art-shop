import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

const Navbar: React.FC = () => {
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-purple-900">
            Art Prints
          </Link>
          
          <div className="flex items-center space-x-8">
            <Link to="/shop" className="text-gray-600 hover:text-gray-900">
              Shop
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;