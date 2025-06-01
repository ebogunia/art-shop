import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="relative">
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg"
          alt="Art gallery"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Beautiful Art Prints
        </h1>
        <p className="mt-6 text-xl text-gray-300 max-w-3xl">
          Discover unique artwork from talented artists around the world. 
          Transform your space with our premium quality prints.
        </p>
        <div className="mt-10">
          <Link
            to="/shop"
            className="inline-block bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 rounded-md"
          >
            Shop Collection
          </Link>
        </div>
      </div>
    </div>
  );
}