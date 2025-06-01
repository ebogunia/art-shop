import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { Product } from '../types/product';

// Placeholder data - would be fetched from API in a real application
const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Abstract Composition",
    artist: "Elena Martin",
    description: "A vibrant abstract composition exploring color and form. This piece features bold, gestural brushstrokes and a harmonious color palette that creates dynamic visual tension. The artist uses layers of paint to build depth and texture, inviting the viewer to explore the composition from different perspectives.\n\nThe artwork reflects influences from abstract expressionism and color field painting, while maintaining a contemporary sensibility. Each print is produced using archival inks on premium fine art paper to ensure color accuracy and longevity.",
    price: 85,
    sizes: [
      { name: "Small", dimensions: "8×10″", price: 85 },
      { name: "Medium", dimensions: "12×16″", price: 135 },
      { name: "Large", dimensions: "18×24″", price: 195 }
    ],
    categories: ["abstract", "modern"],
    tags: ["colorful", "geometric", "bold"],
    images: [
      "https://images.pexels.com/photos/1568607/pexels-photo-1568607.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    stock: 12,
    featured: true,
    createdAt: "2023-01-15T00:00:00Z"
  },
  {
    id: "2",
    name: "Ocean Sunset",
    artist: "David Chen",
    description: "A peaceful seascape capturing the golden colors of sunset over the ocean. This serene landscape evokes a sense of calm and contemplation as the sun dips below the horizon, casting warm golden light across the water.\n\nThe artist uses a masterful blend of colors to depict the transitional moment between day and night, with subtle gradations of orange, pink, and purple in the sky reflected on the water's surface. The horizon line creates a perfect balance in the composition, while the texture of the brushwork suggests the gentle movement of waves.\n\nEach print is produced using archival pigment inks on premium fine art paper, preserving the depth of color and atmospheric quality of the original painting.",
    price: 95,
    sizes: [
      { name: "Small", dimensions: "8×10″", price: 95 },
      { name: "Medium", dimensions: "12×16″", price: 145 },
      { name: "Large", dimensions: "18×24″", price: 215 }
    ],
    categories: ["landscape", "nature"],
    tags: ["ocean", "sunset", "peaceful"],
    images: [
      "https://images.pexels.com/photos/1535162/pexels-photo-1535162.jpeg?auto=compress&cs=tinysrgb&w=1600",
      "https://images.pexels.com/photos/2480816/pexels-photo-2480816.jpeg?auto=compress&cs=tinysrgb&w=1600"
    ],
    stock: 8,
    featured: true,
    createdAt: "2023-02-20T00:00:00Z"
  }
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const addToCart = useCartStore((state) => state.addItem);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setLoading(true);
    
    setTimeout(() => {
      const foundProduct = MOCK_PRODUCTS.find(p => p.id === id);
      setProduct(foundProduct || null);
      
      if (foundProduct && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0].name);
      }
      
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <div className="container-custom py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-neutral-200 rounded w-1/4 mx-auto mb-4"></div>
          <div className="h-4 bg-neutral-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="container-custom py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-neutral-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn btn-primary">
          Return to Shop
        </Link>
      </div>
    );
  }
  
  const selectedSizeObject = product.sizes.find(s => s.name === selectedSize);
  const price = selectedSizeObject ? selectedSizeObject.price : product.price;
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = Math.max(1, Math.min(quantity + amount, product.stock));
    setQuantity(newQuantity);
  };
  
  const handleAddToCart = () => {
    if (selectedSize && quantity > 0) {
      addToCart({
        id: `${product.id}-${selectedSize}`,
        name: `${product.name} (${selectedSize})`,
        price,
        image: product.images[0],
        quantity
      });
    }
  };
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className="bg-white">
      <div className="container-custom py-8">
        <div className="mb-6">
          <Link to="/shop" className="text-sm text-purple-700 hover:text-purple-900 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Shop
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-neutral-50"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-5 w-5 text-neutral-800" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-neutral-50"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-5 w-5 text-neutral-800" />
                  </button>
                </>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative aspect-square w-20 flex-shrink-0 rounded-md overflow-hidden ${
                      idx === currentImageIndex ? 'ring-2 ring-purple-700' : 'opacity-70'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">{product.name}</h1>
            <p className="text-purple-700 text-lg mb-4">by {product.artist}</p>
            
            <p className="text-2xl font-semibold mb-6">${price.toFixed(2)}</p>
            
            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Size</h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      selectedSize === size.name
                        ? 'bg-purple-700 text-white'
                        : 'bg-white border border-neutral-300 text-neutral-700 hover:border-purple-500'
                    }`}
                  >
                    {size.name} ({size.dimensions})
                    {size.price !== product.price && (
                      <span className="ml-1 text-xs">
                        {size.price > product.price ? '+' : ''}
                        ${Math.abs(size.price - product.price).toFixed(2)}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-700 mb-3">Quantity</h3>
              <div className="flex items-center border border-neutral-300 rounded-md w-32">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-2 text-neutral-600 hover:text-neutral-900"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(parseInt(e.target.value) || 1, product.stock)))}
                  className="w-full text-center border-none focus:ring-0 py-2"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-2 text-neutral-600 hover:text-neutral-900"
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-neutral-500 mt-2">
                {product.stock} available
              </p>
            </div>
            
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="w-full btn btn-primary flex items-center justify-center"
              disabled={product.stock === 0}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            
            {/* Description */}
            <div className="mt-8 border-t border-neutral-200 pt-8">
              <h3 className="text-lg font-medium mb-4">Description</h3>
              <div className="prose prose-sm max-w-none text-neutral-700">
                {product.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </div>
            
            {/* Details */}
            <div className="mt-8 border-t border-neutral-200 pt-8">
              <h3 className="text-lg font-medium mb-4">Details</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li>• Premium museum-quality archival print</li>
                <li>• Printed on 100% cotton fine art paper</li>
                <li>• Fade-resistant inks with a lifetime of 100+ years</li>
                <li>• Ships unframed, ready for your custom frame</li>
                <li>• Made to order, please allow 3-5 business days for printing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;