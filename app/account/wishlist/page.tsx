'use client';

import { useState } from 'react';
import { Product } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedProduct } from '@/utils/productTranslations';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';

export default function WishlistPage() {
  const { t } = useLanguage();
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [showAddedMessage, setShowAddedMessage] = useState<number | null>(null);

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setShowAddedMessage(product.id);
    setTimeout(() => setShowAddedMessage(null), 2000);
  };

  const handleRemoveFromWishlist = (productId: number) => {
    removeFromWishlist(productId);
  };

  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('account.wishlist')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h2 className="font-bold text-lg mb-4">{t('account.settings')}</h2>
              <nav className="space-y-2">
                <Link
                  href="/account"
                  className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  {t('account.title')}
                </Link>
                <Link
                  href="/account/orders"
                  className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  {t('account.orders')}
                </Link>
                <Link
                  href="/account/wishlist"
                  className="block px-3 py-2 bg-blue-50 text-blue-600 font-semibold rounded"
                >
                  {t('account.wishlist')}
                </Link>
                <Link
                  href="/account/recommendations"
                  className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  {t('account.recommendations')}
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {wishlist.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <p className="text-gray-600 text-lg mb-4">{t('account.wishlist.empty')}</p>
                <p className="text-gray-500 mb-6">{t('account.wishlist.startAdding')}</p>
                <Link
                  href="/"
                  className="inline-block bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded"
                >
                  {t('common.continueShopping')}
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-600">
                    {wishlist.length} {wishlist.length === 1 ? t('category.product') : t('category.products')}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => {
                const translatedProduct = getTranslatedProduct(item, t);
                const showMessage = showAddedMessage === item.id;
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
                    {showMessage && (
                      <div className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded text-xs z-10">
                        {t('cart.added')}
                      </div>
                    )}
                    <Link href={`/product/${item.id}`} className="block">
                      <div className="aspect-square bg-gray-100 rounded mb-3 overflow-hidden relative">
                        <Image
                          src={item.image}
                          alt={translatedProduct.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                      </div>
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-amazon-orange">
                        {translatedProduct.title}
                      </h3>
                    </Link>
                    {item.price && (
                      <p className="text-lg font-bold text-amazon-orange mb-3">
                        ${item.price.toFixed(2)}
                      </p>
                    )}
                    <div className="space-y-2">
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="w-full bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded text-sm transition-colors"
                      >
                        {t('common.addToCart')}
                      </button>
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="w-full border border-gray-400 hover:bg-gray-50 text-black font-semibold py-2 px-4 rounded text-sm transition-colors"
                      >
                        {t('account.wishlist.remove')}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

