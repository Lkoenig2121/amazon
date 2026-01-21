'use client';

import { allProducts } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedProduct } from '@/utils/productTranslations';

export default function RecommendationsPage() {
  const { t } = useLanguage();
  // Mock recommendations - in a real app, this would be personalized based on user's browsing/purchase history
  const recommendations = allProducts.slice(0, 12);

  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('account.recommendations')}</h1>

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
                  className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  {t('account.wishlist')}
                </Link>
                <Link
                  href="/account/recommendations"
                  className="block px-3 py-2 bg-blue-50 text-blue-600 font-semibold rounded"
                >
                  {t('account.recommendations')}
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            <p className="text-gray-600 mb-6">
              {t('account.recommendations.desc')}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
            >
              <div className="aspect-square bg-gray-100 rounded mb-3 overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={getTranslatedProduct(product, t).title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>
              <h3 className="font-semibold text-sm mb-1 line-clamp-2">{getTranslatedProduct(product, t).title}</h3>
              <p className="text-xs text-gray-600 mb-2">{getTranslatedProduct(product, t).category}</p>
              {product.price && (
                <p className="text-lg font-bold text-amazon-orange">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </Link>
          ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

