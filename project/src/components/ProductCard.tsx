import React from 'react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addItem);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    });
  };
  
  return (
    <Link to={`/product/${product.id}`}>
      <div className="card group">
        <div className="relative overflow-hidden aspect-[3/4]">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-purple-50"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5 text-purple-700" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-neutral-900 mb-1">{product.name}</h3>
          <p className="text-sm text-neutral-500 mb-2">{product.artist}</p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-neutral-900">${product.price.toFixed(2)}</p>
            {product.stock <= 5 && product.stock > 0 ? (
              <span className="text-xs text-amber-600">Only {product.stock} left</span>
            ) : product.stock === 0 ? (
              <span className="text-xs text-red-600">Sold out</span>
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;