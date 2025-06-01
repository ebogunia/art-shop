import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore, CartItem } from '../stores/cartStore';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = items.length > 0 ? 10 : 0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shipping + tax;
  
  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    updateQuantity(item.id, newQuantity);
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] bg-white flex items-center justify-center">
        <div className="text-center px-4 py-10">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-neutral-300" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Your cart is empty</h2>
          <p className="text-neutral-600 mb-6">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 py-8 md:py-12">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-neutral-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                  </h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    Remove All
                  </button>
                </div>
              </div>
              
              {items.map((item) => (
                <div key={item.id} className="p-6 border-b border-neutral-100 flex flex-col sm:flex-row">
                  <div className="flex-shrink-0 w-full sm:w-24 h-24 mb-4 sm:mb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  
                  <div className="flex-grow sm:ml-6">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div className="mb-4 sm:mb-0">
                        <h3 className="text-lg font-medium">{item.name}</h3>
                        <p className="text-neutral-500 text-sm">${item.price.toFixed(2)}</p>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                        <div className="flex items-center border border-neutral-200 rounded-md w-32">
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="px-3 py-1 text-neutral-600 hover:text-neutral-900"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(item, parseInt(e.target.value) || 1)}
                            className="w-full text-center border-none focus:ring-0 py-1"
                          />
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="px-3 py-1 text-neutral-600 hover:text-neutral-900"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between sm:justify-end">
                          <div className="sm:w-24 font-medium text-right">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-4 text-neutral-400 hover:text-red-600 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="p-6">
                <Link to="/shop" className="text-purple-700 hover:text-purple-900 flex items-center text-sm">
                  <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-100 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Link to="/checkout" className="btn btn-primary w-full">
                Proceed to Checkout
              </Link>
              
              <div className="mt-4 text-xs text-neutral-500 text-center">
                Secure checkout powered by PayPal
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;