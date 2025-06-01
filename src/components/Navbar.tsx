import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

export default function Navbar() {
  const cartItems = useCartStore(state => state.items);
  const itemCount = cartItems.length;

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              Art Prints
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/shop" className="text-gray-600 hover:text-gray-900">
              Shop
            </Link>
            <Link to="/cart" className="text-gray-600 hover:text-gray-900 relative">
              Cart
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}