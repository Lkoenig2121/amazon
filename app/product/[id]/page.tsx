'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { allProducts, Product } from '@/data/products';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslatedProduct } from '@/utils/productTranslations';
import { useWishlist } from '@/contexts/WishlistContext';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showAddedMessage, setShowAddedMessage] = useState(false);

  useEffect(() => {
    const productId = parseInt(params.id as string);
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct || null);
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setShowAddedMessage(true);
      setTimeout(() => setShowAddedMessage(false), 2000);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addToCart(product, quantity);
      router.push('/checkout');
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-amazon-light flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{t('common.productNotFound')}</p>
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

  const translatedProduct = getTranslatedProduct(product, t);

  return (
    <div className="min-h-screen bg-amazon-light">
      {showAddedMessage && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {t('cart.added')}
        </div>
      )}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4">
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-amazon-orange hover:underline text-sm"
          >
            {t('product.back')}
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Image */}
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
              <Image
                src={product.image}
                alt={translatedProduct.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>

            {/* Product Details */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{translatedProduct.title}</h1>
              
              <div className="mb-4">
                <Link
                  href={`/search?q=${encodeURIComponent(translatedProduct.category)}`}
                  className="text-blue-600 hover:text-amazon-orange hover:underline text-sm"
                >
                  {translatedProduct.category}
                </Link>
              </div>

              {product.price && (
                <div className="mb-6">
                  <p className="text-3xl font-bold text-amazon-orange mb-2">
                    ${product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">{t('common.priceIncludesShipping')}</p>
                </div>
              )}

              {/* Tags */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold">{t('product.tags')}</p>
                  <button
                    onClick={() => toggleWishlist(product)}
                    className="flex items-center gap-2 px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 transition-colors"
                    aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <span className={`text-xl ${isInWishlist(product.id) ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {isInWishlist(product.id) ? '★' : '☆'}
                    </span>
                    <span className="text-sm text-gray-700">
                      {isInWishlist(product.id) ? t('wishlist.remove') : t('wishlist.add')}
                    </span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, idx) => (
                    <Link
                      key={idx}
                      href={`/search?q=${encodeURIComponent(tag)}`}
                      className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 px-3 py-1 rounded"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Description */}
              {translatedProduct.description && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">{t('product.description')}</h3>
                  <p className="text-gray-700">{translatedProduct.description}</p>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-semibold mb-2">
                  {t('product.quantity')}
                </label>
                <select
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="border border-gray-400 rounded px-3 py-2 text-black"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-3 px-6 rounded text-lg"
                >
                  {t('common.addToCart')}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="w-full bg-amazon-orange hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded text-lg"
                >
                  {t('common.buyNow')}
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-semibold w-32">{t('product.shipsFrom')}</span>
                    <span>Amazon</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32">{t('product.soldBy')}</span>
                    <span>Amazon.com</span>
                  </div>
                  <div className="flex">
                    <span className="font-semibold w-32">{t('product.returnPolicy')}</span>
                    <span>{t('product.returnEligible')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">{t('product.related')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allProducts
              .filter(p => {
                if (p.id === product.id) return false;
                // Match products with similar category or tags
                const productCategory = translatedProduct.category.toLowerCase();
                const relatedTranslated = getTranslatedProduct(p, t);
                return relatedTranslated.category.toLowerCase() === productCategory ||
                       p.tags.some(tag => product.tags.includes(tag));
              })
              .slice(0, 6)
              .map((relatedProduct) => {
                const relatedTranslated = getTranslatedProduct(relatedProduct, t);
                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
                  >
                    <div className="aspect-square bg-gray-100 rounded mb-2 overflow-hidden relative">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedTranslated.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      />
                    </div>
                    <h3 className="font-semibold text-sm mb-1 line-clamp-2">{relatedTranslated.title}</h3>
                    {relatedProduct.price && (
                      <p className="text-lg font-bold text-amazon-orange">
                        ${relatedProduct.price.toFixed(2)}
                      </p>
                    )}
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

