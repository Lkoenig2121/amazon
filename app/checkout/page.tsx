'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

export default function CheckoutPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const { cart, clearCart, getTotalPrice, getTotalItems, updateQuantity, removeFromCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment, 3: Review
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  useEffect(() => {
    if (cart.length === 0 && !orderPlaced) {
      router.push('/');
    }
  }, [cart, orderPlaced, router]);

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePlaceOrder = () => {
    // Simulate order placement
    clearCart();
    setOrderPlaced(true);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-amazon-light flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold text-green-600 mb-4">{t('checkout.orderPlaced')}</h1>
        <p className="text-gray-600 mb-6">
          {t('checkout.thankYou')}
        </p>
        <p className="text-2xl font-bold mb-6">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        <p className="text-sm text-gray-500 mb-6">
          {t('checkout.confirmationEmail')}
        </p>
        <Link
          href="/"
          className="inline-block bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded"
        >
          {t('common.continueShopping')}
        </Link>
      </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return null;
  }

  const subtotal = getTotalPrice();
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('checkout.title')}</h1>

        <div className="flex gap-8 flex-col lg:flex-row">
          {/* Main Content */}
          <div className="flex-1">
            {/* Progress Steps */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className={`flex items-center ${step >= 1 ? 'text-amazon-orange' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-amazon-orange text-white' : 'bg-gray-200'}`}>
                    {step > 1 ? '✓' : '1'}
                  </div>
                  <span className="ml-2 font-semibold">{t('checkout.shipping')}</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-amazon-orange' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center ${step >= 2 ? 'text-amazon-orange' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-amazon-orange text-white' : 'bg-gray-200'}`}>
                    {step > 2 ? '✓' : '2'}
                  </div>
                  <span className="ml-2 font-semibold">{t('checkout.payment')}</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step >= 3 ? 'bg-amazon-orange' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center ${step >= 3 ? 'text-amazon-orange' : 'text-gray-400'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-amazon-orange text-white' : 'bg-gray-200'}`}>
                    3
                  </div>
                  <span className="ml-2 font-semibold">{t('checkout.review')}</span>
                </div>
              </div>
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">{t('checkout.shippingAddress')}</h2>
                <form onSubmit={handleShippingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">{t('checkout.fullName')}</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.fullName}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">{t('checkout.address')}</label>
                    <input
                      type="text"
                      required
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">{t('checkout.city')}</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">{t('checkout.state')}</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.state}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">{t('checkout.zipCode')}</label>
                      <input
                        type="text"
                        required
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">{t('checkout.phone')}</label>
                      <input
                        type="tel"
                        required
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded"
                  >
                    {t('checkout.continuePayment')}
                  </button>
                </form>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">{t('checkout.paymentMethod')}</h2>
                <form onSubmit={handlePaymentSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">{t('checkout.cardNumber')}</label>
                    <input
                      type="text"
                      required
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: formatCardNumber(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                    />
                    <p className="text-xs text-gray-500 mt-1">Use any fake card number (e.g., 4111 1111 1111 1111)</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">{t('checkout.cardName')}</label>
                    <input
                      type="text"
                      required
                      value={paymentInfo.cardName}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, cardName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-1">{t('checkout.expiryDate')}</label>
                      <input
                        type="text"
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiryDate: formatExpiryDate(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-1">{t('checkout.cvv')}</label>
                      <input
                        type="text"
                        required
                        maxLength={4}
                        placeholder="123"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value.replace(/\D/g, '') })}
                        className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 px-6 rounded"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded"
                    >
                      Continue to Review
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-4">{t('checkout.reviewOrder')}</h2>
                
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">{t('checkout.shippingAddressLabel')}</h3>
                  <p className="text-gray-700">
                    {shippingInfo.fullName}<br />
                    {shippingInfo.address}<br />
                    {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                    {shippingInfo.phone}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="font-semibold mb-2">{t('checkout.paymentMethodLabel')}</h3>
                  <p className="text-gray-700">
                    Card ending in {paymentInfo.cardNumber.slice(-4)}<br />
                    {paymentInfo.cardName}<br />
                    {t('checkout.expires')} {paymentInfo.expiryDate}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 px-6 rounded"
                  >
                    {t('checkout.back')}
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-amazon-orange hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded"
                  >
                    {t('checkout.placeOrder')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold line-clamp-2">{item.title}</p>
                      <p className="text-xs text-gray-600">{t('common.qty')} {item.quantity}</p>
                      {item.price && (
                        <p className="text-sm font-bold text-amazon-orange">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{t('cart.subtotal')} ({getTotalItems()} {t('cart.items')}):</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('checkout.shippingLabel')}</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>{t('checkout.tax')}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>{t('checkout.total')}</span>
                  <span className="text-amazon-orange">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

