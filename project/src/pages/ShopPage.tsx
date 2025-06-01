import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/product';

// Placeholder data - would be fetched from API in a real application
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Abstract Composition",
    artist: "Elena Martin",
    description: "A vibrant abstract composition exploring color and form.",
    price: 85,
    sizes: [
      { name: "Small", dimensions: "8×10″", price: 85 },
      { name: "Medium", dimensions: "12×16″", price: 135 },
      { name: "Large", dimensions: "18×24″", price: 195 }
    ],
    categories: ["abstract", "modern"],
    tags: ["colorful", "geometric", "bold"],
    images: ["https://images.pexels.com/photos/1568607/pexels-photo-1568607.jpeg?auto=compress&cs=tinysrgb&w=1600"],
    stock: 12,
    featured: true,
    createdAt: "2023-01-15T00:00:00Z"
  },
  {
    id: "2",
    name: "Ocean Sunset",
    artist: "David Chen",
    description: "A peaceful seascape capturing the golden colors of sunset over the ocean.",
    price: 95,
    sizes: [
      { name: "Small", dimensions: "8×10″", price: 95 },
      { name: "Medium", dimensions: "12×16″", price: 145 },
      { name: "Large", dimensions: "18×24″", price: 215 }
    ],
    categories: ["landscape", "nature"],
    tags: ["ocean", "sunset", "peaceful"],
    images: ["https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=1600"],
    stock: 8,
    featured: true,
    createdAt: "2023-02-20T00:00:00Z"
  },
  {
    id: "3",
    name: "Urban Geometry",
    artist: "Sofia Diaz",
    description: "Architectural details from urban landscapes creating mesmerizing geometric patterns.",
    price: 110,
    sizes: [
      { name: "Small", dimensions: "8×10″", price: 110 },
      { name: "Medium", dimensions: "12×16″", price: 165 },
      { name: "Large", dimensions: "18×24″", price: 240 }
    ],
    categories: ["urban", "architecture", "modern"],
    tags: ["geometry", "lines", "black and white"],
    images: ["https://images.pexels.com/photos/2693212/pexels-photo-2693212.png?auto=compress&cs=tinysrgb&w=1600"],
    stock: 5,
    featured: false,
    createdAt: "2023-03-10T00:00:00Z"
  },
  {
    id: "4",
    name: "Botanical Dreams",
    artist: "Thomas Wright",
    description: "Delicate botanical illustrations inspired by vintage scientific drawings.",
    price: 75,
    sizes: [
      { name: "Small", dimensions: "8×10″", price: 75 },
      { name: "Medium", dimensions: "12×16″", price: 125 },
      { name: "Large", dimensions: "18×24″", price: 185 }
    ],
    categories: ["botanical", "nature"],
    tags: ["plants", "vintage", "detailed"],
    images: ["https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=1600"],
    stock: 15,
    featured: false,
    createdAt: "2023-04-05T00:00:00Z"
  },
  {
    id: "5",
    name: "Mountain Mist",
    artist: "Akiko Tanaka",
    description: "Inspired by traditional Japanese painting, this piece captures mountains shrouded in mist.",
    price: 120,
    sizes: [
      { name: "Small", dimensions: "8×10″", price: 120 },
      { name: "Medium", dimensions: "12×16″", price: 180 },
      { name: "Large", dimensions: "18×24″", price: 260 }
    ],
    categories: ["landscape", "asian-inspired"],
    tags: ["mountains", "mist", "minimalist"],
    images: ["https://images.pexels.com/photos/14669413/pexels-photo-14669413.jpeg?auto=compress&cs=tinysrgb&w=1600"],
    stock: 7,
    featured: true,
    createdAt: "2023-05-12T00:00:00Z"
  },
  {
    id: "6",
    name: "Portrait Study",
    artist: "Marcus Jones",
    description: "A contemporary portrait study exploring emotion and identity.",
    price: 90,
    sizes: [
      { name: "Small", dimensions: "8×10″", price: 90 },
      { name: "Medium", dimensions: "12×16″", price: 140 },
      { name: "Large", dimensions: "18×24″", price: 210 }
    ],
    categories: ["portrait", "figurative"],
    tags: ["contemporary", "expressive", "human"],
    images: ["https://images.pexels.com/photos/2260844/pexels-photo-2260844.jpeg?auto=compress&cs=tinysrgb&w=1600"],
    stock: 3,
    featured: false,
    createdAt: "2023-06-18T00:00:00Z"
  }
];

const CATEGORIES = [
  "abstract",
  "landscape",
  "portrait",
  "botanical",
  "urban",
  "architecture",
  "nature",
  "asian-inspired",
  "figurative",
  "modern"
];

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const categoryFilter = searchParams.get('category');
  const searchQuery = searchParams.get('search');
  const featuredFilter = searchParams.get('featured') === 'true';
  
  useEffect(() => {
    // In a real app, this would be an API call
    setProducts(MOCK_PRODUCTS);
  }, []);
  
  useEffect(() => {
    let filtered = [...products];
    
    if (categoryFilter) {
      filtered = filtered.filter(product => 
        product.categories.includes(categoryFilter.toLowerCase())
      );
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.artist.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    if (featuredFilter) {
      filtered = filtered.filter(product => product.featured);
    }
    
    setFilteredProducts(filtered);
  }, [products, categoryFilter, searchQuery, featuredFilter]);
  
  const handleCategoryChange = (category: string) => {
    searchParams.set('category', category);
    setSearchParams(searchParams);
  };
  
  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
  };
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    
    if (query) {
      searchParams.set('search', query);
    } else {
      searchParams.delete('search');
    }
    
    setSearchParams(searchParams);
  };
  
  const handleFeaturedToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      searchParams.set('featured', 'true');
    } else {
      searchParams.delete('featured');
    }
    setSearchParams(searchParams);
  };
  
  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };
  
  return (
    <div className="bg-neutral-50 min-h-screen">
      <div className="bg-purple-900 py-12 md:py-20">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Art Print Collection</h1>
          <p className="text-purple-200 max-w-2xl">
            Browse our curated collection of art prints from talented artists around the world. 
            Find the perfect piece to elevate your space.
          </p>
        </div>
      </div>
      
      <div className="container-custom py-8">
        {/* Search and mobile filter toggle */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <form onSubmit={handleSearch} className="w-full md:w-auto flex">
            <input
              type="text"
              name="search"
              placeholder="Search prints or artists..."
              className="input rounded-r-none"
              defaultValue={searchQuery || ''}
            />
            <button type="submit" className="btn btn-primary rounded-l-none px-4">
              Search
            </button>
          </form>
          
          <button 
            className="btn btn-secondary flex items-center justify-center md:hidden"
            onClick={toggleMobileFilter}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Filters</h3>
                  {(categoryFilter || featuredFilter) && (
                    <button 
                      onClick={handleClearFilters}
                      className="text-sm text-purple-700 hover:text-purple-900"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Featured Artists</h4>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={featuredFilter}
                      onChange={handleFeaturedToggle}
                      className="h-4 w-4 text-purple-700 focus:ring-purple-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="featured" className="ml-2 text-sm text-neutral-700">
                      Featured Artists Only
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Categories</h4>
                  <div className="space-y-1">
                    {CATEGORIES.map(category => (
                      <div key={category} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-${category}`}
                          name="category"
                          checked={categoryFilter === category}
                          onChange={() => handleCategoryChange(category)}
                          className="h-4 w-4 text-purple-700 focus:ring-purple-500 border-neutral-300"
                        />
                        <label htmlFor={`category-${category}`} className="ml-2 text-sm text-neutral-700 capitalize">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Filters - Mobile */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
              <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">Filters</h3>
                  <button onClick={toggleMobileFilter}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Featured Artists</h4>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured-mobile"
                      checked={featuredFilter}
                      onChange={handleFeaturedToggle}
                      className="h-4 w-4 text-purple-700 focus:ring-purple-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="featured-mobile" className="ml-2 text-sm text-neutral-700">
                      Featured Artists Only
                    </label>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 mb-2">Categories</h4>
                  <div className="space-y-1">
                    {CATEGORIES.map(category => (
                      <div key={`mobile-${category}`} className="flex items-center">
                        <input
                          type="radio"
                          id={`category-mobile-${category}`}
                          name="category-mobile"
                          checked={categoryFilter === category}
                          onChange={() => {
                            handleCategoryChange(category);
                            toggleMobileFilter();
                          }}
                          className="h-4 w-4 text-purple-700 focus:ring-purple-500 border-neutral-300"
                        />
                        <label htmlFor={`category-mobile-${category}`} className="ml-2 text-sm text-neutral-700 capitalize">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <button 
                    onClick={handleClearFilters}
                    className="w-full btn btn-secondary"
                  >
                    Clear all filters
                  </button>
                  <button 
                    onClick={toggleMobileFilter}
                    className="w-full btn btn-primary mt-2"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Product Grid */}
          <div className="flex-grow">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-neutral-600">
                Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'print' : 'prints'}
              </p>
              <div className="flex items-center">
                <span className="text-sm text-neutral-600 mr-2">Sort by:</span>
                <select className="input py-1 px-2 text-sm">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Popularity</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-lg text-neutral-600 mb-4">No products match your search criteria.</p>
                <button 
                  onClick={handleClearFilters}
                  className="btn btn-secondary"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;