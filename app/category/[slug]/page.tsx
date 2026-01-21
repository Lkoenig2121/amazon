'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProductsByCategory, Product } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedProduct } from '@/utils/productTranslations';
import { useWishlist } from '@/contexts/WishlistContext';

const categoryMap: { [key: string]: string } = {
  'amazon-haul': 'Amazon Haul',
  'medical-care': 'Medical Care',
  'amazon-basics': 'Amazon Basics',
  'best-sellers': 'Best Sellers',
  'books': 'Books',
  'registry': 'Registry',
  'new-releases': 'New Releases',
  'gift-cards': 'Gift Cards',
  'smart-home': 'Smart Home',
  'todays-deals': 'Today\'s Deals',
};

// Map category names to search terms
const categorySearchMap: { [key: string]: string[] } = {
  'Amazon Haul': ['fashion', 'clothing', 'saks'],
  'Medical Care': ['medical', 'health', 'medical care'],
  'Amazon Basics': ['amazon basics'],
  'Best Sellers': ['best sellers'],
  'Books': ['books'],
  'Registry': ['registry', 'gifts'],
  'New Releases': ['new releases'],
  'Gift Cards': ['gift cards'],
  'Smart Home': ['smart home'],
  'Today\'s Deals': ['deals', 'today\'s deals', 'discount'],
};

export default function CategoryPage() {
  const { t } = useLanguage();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const params = useParams();
  const slug = params.slug as string;
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const category = categoryMap[slug] || slug;
    setCategoryName(category);
    
    // Try multiple search terms for better matching
    const searchTerms = categorySearchMap[category] || [category.toLowerCase()];
    let categoryProducts: Product[] = [];
    
    for (const term of searchTerms) {
      const found = getProductsByCategory(term);
      if (found.length > 0) {
        categoryProducts = found;
        break;
      }
    }
    
    // If no products found, try the category name directly
    if (categoryProducts.length === 0) {
      categoryProducts = getProductsByCategory(category);
    }
    
    setProducts(categoryProducts);
  }, [slug]);

  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
          <p className="text-sm text-gray-600">
            {products.length} {products.length === 1 ? t('category.product') : t('category.products')}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white p-8 rounded-lg text-center">
            <p className="text-gray-600 text-lg mb-4">{t('category.noProducts')}</p>
            <Link
              href="/"
              className="inline-block mt-4 bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded"
            >
              {t('common.continueShopping')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
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
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
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

