import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';
import { ChevronLeft, CreditCard, Check } from 'lucide-react';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface ShippingFormData {
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}

const initialShippingData: ShippingFormData = {
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  zipCode: '',
  country: 'United States',
  phone: '',
  email: '',
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingData, setShippingData] = useState<ShippingFormData>(initialShippingData);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'credit-card'>('paypal');
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = 10;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('payment');
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('review');
  };
  
  const handlePlaceOrder = () => {
    // In a real app, this would submit order data to the backend
    setTimeout(() => {
      setOrderPlaced(true);
      clearCart();
      
      // Redirect to confirmation page or show confirmation
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1500);
  };
  
  const handleShippingInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };
  
  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }
  
  if (orderPlaced) {
    return (
      <div className="min-h-[60vh] bg-white flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <div className="mx-auto mb-6 bg-green-100 w-20 h-20 rounded-full flex items-center justify-center">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully!</h2>
          <p className="text-neutral-600 mb-6">
            Thank you for your purchase. We'll send you a confirmation email with your order details shortly.
          </p>
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-neutral-50 py-8 md:py-12">
      <div className="container-custom">
        <div className="mb-6">
          <Link to="/cart" className="text-sm text-purple-700 hover:text-purple-900 flex items-center">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Cart
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {/* Checkout Steps */}
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <div className="w-full">
              <div className="relative flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'shipping' ? 'bg-purple-700 text-white' : 'bg-purple-100 text-purple-700'
                }`}>
                  1
                </div>
                <div className="ml-2 text-sm font-medium">Shipping</div>
                <div className="flex-grow border-t border-neutral-200 ml-4"></div>
              </div>
            </div>
            
            <div className="w-full">
              <div className="relative flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'payment' ? 'bg-purple-700 text-white' : 
                  currentStep === 'review' ? 'bg-purple-100 text-purple-700' : 'bg-neutral-200 text-neutral-400'
                }`}>
                  2
                </div>
                <div className="ml-2 text-sm font-medium">Payment</div>
                <div className="flex-grow border-t border-neutral-200 ml-4"></div>
              </div>
            </div>
            
            <div className="w-full">
              <div className="relative flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === 'review' ? 'bg-purple-700 text-white' : 'bg-neutral-200 text-neutral-400'
                }`}>
                  3
                </div>
                <div className="ml-2 text-sm font-medium">Review</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Shipping Form */}
            {currentStep === 'shipping' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={shippingData.firstName}
                        onChange={handleShippingInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={shippingData.lastName}
                        onChange={handleShippingInputChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={shippingData.address}
                      onChange={handleShippingInputChange}
                      className="input"
                      required
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="apartment" className="block text-sm font-medium text-neutral-700 mb-1">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={shippingData.apartment}
                      onChange={handleShippingInputChange}
                      className="input"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={shippingData.city}
                        onChange={handleShippingInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-neutral-700 mb-1">
                        State/Province *
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={shippingData.state}
                        onChange={handleShippingInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="block text-sm font-medium text-neutral-700 mb-1">
                        ZIP/Postal Code *
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={shippingData.zipCode}
                        onChange={handleShippingInputChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">
                      Country *
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={shippingData.country}
                      onChange={handleShippingInputChange}
                      className="input"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={shippingData.phone}
                        onChange={handleShippingInputChange}
                        className="input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={shippingData.email}
                        onChange={handleShippingInputChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>
                  
                  <button type="submit" className="btn btn-primary w-full">
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}
            
            {/* Payment Method */}
            {currentStep === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <form onSubmit={handlePaymentSubmit}>
                  <div className="space-y-4 mb-6">
                    <div
                      className={`border rounded-md p-4 cursor-pointer ${
                        paymentMethod === 'paypal' ? 'border-purple-500 bg-purple-50' : 'border-neutral-200'
                      }`}
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          checked={paymentMethod === 'paypal'}
                          onChange={() => setPaymentMethod('paypal')}
                          className="h-4 w-4 text-purple-700 focus:ring-purple-500 border-neutral-300"
                        />
                        <label htmlFor="paypal" className="ml-3 flex items-center cursor-pointer">
                          <span className="font-medium">PayPal</span>
                          <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            alt="PayPal"
                            className="h-6 ml-2"
                          />
                        </label>
                      </div>
                      {paymentMethod === 'paypal' && (
                        <div className="mt-4 text-sm text-neutral-600">
                          You will be redirected to PayPal to complete your purchase securely.
                        </div>
                      )}
                    </div>
                    
                    <div
                      className={`border rounded-md p-4 cursor-pointer ${
                        paymentMethod === 'credit-card' ? 'border-purple-500 bg-purple-50' : 'border-neutral-200'
                      }`}
                      onClick={() => setPaymentMethod('credit-card')}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="credit-card"
                          name="paymentMethod"
                          checked={paymentMethod === 'credit-card'}
                          onChange={() => setPaymentMethod('credit-card')}
                          className="h-4 w-4 text-purple-700 focus:ring-purple-500 border-neutral-300"
                        />
                        <label htmlFor="credit-card" className="ml-3 flex items-center cursor-pointer">
                          <span className="font-medium">Credit Card</span>
                          <CreditCard className="h-5 w-5 ml-2 text-neutral-600" />
                        </label>
                      </div>
                      
                      {paymentMethod === 'credit-card' && (
                        <div className="mt-4 grid grid-cols-1 gap-4">
                          <div>
                            <label htmlFor="cardNumber" className="block text-sm font-medium text-neutral-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="input"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiry" className="block text-sm font-medium text-neutral-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                id="expiry"
                                placeholder="MM/YY"
                                className="input"
                              />
                            </div>
                            <div>
                              <label htmlFor="cvc" className="block text-sm font-medium text-neutral-700 mb-1">
                                CVC
                              </label>
                              <input
                                type="text"
                                id="cvc"
                                placeholder="123"
                                className="input"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="nameOnCard" className="block text-sm font-medium text-neutral-700 mb-1">
                              Name on Card
                            </label>
                            <input
                              type="text"
                              id="nameOnCard"
                              placeholder="John Doe"
                              className="input"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('shipping')}
                      className="btn btn-secondary"
                    >
                      Back
                    </button>
                    <button type="submit" className="btn btn-primary flex-grow">
                      Continue to Review
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {/* Order Review */}
            {currentStep === 'review' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>
                
                <div className="mb-8">
                  <h3 className="font-medium text-lg mb-3">Shipping Information</h3>
                  <div className="bg-neutral-50 p-4 rounded-md">
                    <p className="font-medium">{shippingData.firstName} {shippingData.lastName}</p>
                    <p>{shippingData.address}</p>
                    {shippingData.apartment && <p>{shippingData.apartment}</p>}
                    <p>{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                    <p>{shippingData.country}</p>
                    <p className="mt-2">{shippingData.phone}</p>
                    <p>{shippingData.email}</p>
                  </div>
                  <button
                    onClick={() => setCurrentStep('shipping')}
                    className="text-sm text-purple-700 mt-2 hover:text-purple-900"
                  >
                    Edit
                  </button>
                </div>
                
                <div className="mb-8">
                  <h3 className="font-medium text-lg mb-3">Payment Method</h3>
                  <div className="bg-neutral-50 p-4 rounded-md flex items-center">
                    {paymentMethod === 'paypal' ? (
                      <>
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                          alt="PayPal"
                          className="h-6 mr-2"
                        />
                        <span>PayPal</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="h-5 w-5 mr-2 text-neutral-600" />
                        <span>Credit Card ending in ****</span>
                      </>
                    )}
                  </div>
                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="text-sm text-purple-700 mt-2 hover:text-purple-900"
                  >
                    Edit
                  </button>
                </div>
                
                <div className="border-t border-neutral-200 pt-6 mb-6">
                  <h3 className="font-medium text-lg mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center">
                        <div className="w-16 h-16 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={() => setCurrentStep('payment')}
                    className="btn btn-secondary"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    className="btn btn-primary flex-grow"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              
              <div className="max-h-60 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex py-2 border-b border-neutral-100 last:border-b-0">
                    <div className="w-12 h-12 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="ml-3 flex-grow">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-neutral-100 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;