'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { searchProducts, Product } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedProduct } from '@/utils/productTranslations';
import { useWishlist } from '@/contexts/WishlistContext';

function SearchResults() {
  const { t } = useLanguage();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || 'All';
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const searchResults = searchProducts(query, category === 'All' ? undefined : category);
    setResults(searchResults);
  }, [query, category]);

  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            {query ? `${t('search.title')} "${query}"` : t('search.title')}
          </h1>
          {category && category !== 'All' && (
            <p className="text-gray-600">Category: {category}</p>
          )}
          <p className="text-sm text-gray-600 mt-2">
            {results.length} {results.length === 1 ? t('search.result') : t('search.results')}
          </p>
        </div>

        {results.length === 0 ? (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-600 text-lg mb-4">{t('search.noResults')}</p>
            <p className="text-gray-500">{t('search.tryAdjusting')}</p>
            <Link
              href="/"
              className="inline-block mt-4 bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded"
            >
              {t('search.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((product) => {
              const translatedProduct = getTranslatedProduct(product, t);
              const inWishlist = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4"
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="aspect-square bg-gray-100 rounded mb-3 overflow-hidden relative">
                      <Image
                        src={product.image}
                        alt={translatedProduct.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Star button on hover */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(product);
                        }}
                        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
                        aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <span className={`text-2xl ${inWishlist ? 'text-yellow-400' : 'text-gray-400'}`}>
                          {inWishlist ? '★' : '☆'}
                        </span>
                      </button>
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{translatedProduct.title}</h3>
                  </Link>
                  <Link
                    href={`/search?q=${encodeURIComponent(translatedProduct.category)}`}
                    className="text-xs text-blue-600 hover:text-amazon-orange hover:underline mb-2 block"
                  >
                    {translatedProduct.category}
                  </Link>
                  {product.price && (
                    <p className="text-lg font-bold text-amazon-orange">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1 mt-2">
                    {product.tags.slice(0, 3).map((tag, idx) => (
                      <Link
                        key={idx}
                        href={`/search?q=${encodeURIComponent(tag)}`}
                        className="text-xs bg-gray-100 text-gray-600 hover:bg-gray-200 px-2 py-1 rounded"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-amazon-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}

