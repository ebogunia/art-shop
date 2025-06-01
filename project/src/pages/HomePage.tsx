import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[90vh] bg-neutral-900 flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/1266808/pexels-photo-1266808.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Art gallery wall"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="container-custom relative z-10 fade-in">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Beautiful Art Prints for Your Space
            </h1>
            <p className="text-xl text-neutral-200 mb-8">
              Discover unique artwork from talented artists around the world.
              Transform your space with our premium quality prints.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/shop" className="btn btn-primary">
                Shop Collection
              </Link>
              <Link to="/shop?featured=true" className="btn btn-secondary">
                Featured Artists
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Browse by Style</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: 'Abstract', 
                image: 'https://images.pexels.com/photos/1569779/pexels-photo-1569779.jpeg?auto=compress&cs=tinysrgb&w=1600',
                link: '/shop?category=abstract'
              },
              { 
                name: 'Landscape', 
                image: 'https://images.pexels.com/photos/3250360/pexels-photo-3250360.jpeg?auto=compress&cs=tinysrgb&w=1600',
                link: '/shop?category=landscape'
              },
              { 
                name: 'Portrait', 
                image: 'https://images.pexels.com/photos/2260844/pexels-photo-2260844.jpeg?auto=compress&cs=tinysrgb&w=1600',
                link: '/shop?category=portrait'
              }
            ].map((category, index) => (
              <Link 
                key={index} 
                to={category.link}
                className="group block relative overflow-hidden rounded-lg aspect-[4/3]"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    <div className="mt-2 flex items-center text-white/80 group-hover:text-white transition-colors">
                      <span className="text-sm">Explore</span>
                      <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Carefully Curated Art Prints</h2>
              <p className="text-lg text-neutral-700 mb-6">
                We work with talented artists to bring you beautiful, high-quality art prints
                that elevate your space. Each print is produced using premium materials and
                state-of-the-art printing techniques.
              </p>
              <p className="text-lg text-neutral-700 mb-8">
                Our collection is thoughtfully curated to offer diverse styles, from abstract
                to landscape, ensuring you'll find the perfect piece for your home or office.
              </p>
              <Link to="/shop" className="btn btn-primary">
                Explore Collection
              </Link>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Framed art print on wall"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-700 rounded-lg -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-200 rounded-lg -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-purple-900 text-white">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="text-purple-100 mb-8">
              Subscribe to receive updates on new artists, exclusive offers, and inspiration for your space.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 text-neutral-900"
                required
              />
              <button type="submit" className="btn bg-white text-purple-900 hover:bg-purple-100">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;