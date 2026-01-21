'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedProduct } from '@/utils/productTranslations';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductSectionProps {
  title: string;
  linkText: string;
  products: Product[];
}

export default function ProductSection({ title, linkText, products }: ProductSectionProps) {
  const { t } = useLanguage();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {products.map((product) => {
            const translatedProduct = getTranslatedProduct(product, t);
            const inWishlist = isInWishlist(product.id);
            return (
              <div 
                key={product.id} 
                className="group relative cursor-pointer hover:opacity-80"
              >
                <Link href={`/product/${product.id}`} className="block">
                  <div className="bg-gray-100 aspect-square rounded mb-2 overflow-hidden relative">
                    <Image
                      src={product.image}
                      alt={translatedProduct.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
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
                </Link>
                <Link
                  href={`/search?q=${encodeURIComponent(translatedProduct.category)}`}
                  className="text-sm text-blue-600 hover:text-amazon-orange hover:underline mb-1 block"
                >
                  {translatedProduct.category}
                </Link>
                {product.price && (
                  <div className="text-lg font-bold text-amazon-orange">
                    ${product.price.toFixed(2)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <a href="#" className="text-blue-600 hover:text-amazon-orange hover:underline text-sm">
          {linkText}
        </a>
      </div>
    </div>
  );
}

