import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">ArtPrints</h3>
            <p className="mb-4 max-w-md">
              Discover unique art prints from talented artists around the world. 
              Each piece is carefully crafted and printed on premium materials.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">Shop</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-white transition-colors">Cart</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">Account</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white transition-colors">FAQ</Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-8 pt-8 text-sm text-neutral-500">
          <p>© {currentYear} ArtPrints. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;