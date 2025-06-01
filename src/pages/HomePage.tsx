import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Art gallery wall"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      
      <div className="relative min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Beautiful Art Prints for Your Space
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Discover unique artwork from talented artists around the world.
              Transform your space with our premium quality prints.
            </p>
            <Link
              to="/shop"
              className="inline-block bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;