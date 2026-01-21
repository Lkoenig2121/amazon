'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from '@/contexts/LanguageContext';
import { allProducts } from '@/data/products';
import { getTranslatedProduct } from '@/utils/productTranslations';

// Mock orders data - in a real app, this would come from an API
const getMockOrders = () => [
  {
    id: 'ORD-001',
    date: '2024-01-15',
    status: 'Delivered',
    items: [
      {
        id: 13,
        productId: 13,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop',
        price: 999.99,
        quantity: 1,
      },
      {
        id: 14,
        productId: 14,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop',
        price: 129.99,
        quantity: 1,
      },
    ],
    total: 1129.98,
  },
  {
    id: 'ORD-002',
    date: '2024-01-10',
    status: 'Delivered',
    items: [
      {
        id: 3,
        productId: 3,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
        price: 189.99,
        quantity: 1,
      },
    ],
    total: 189.99,
  },
  {
    id: 'ORD-003',
    date: '2024-01-05',
    status: 'Delivered',
    items: [
      {
        id: 1,
        productId: 1,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
        price: 299.99,
        quantity: 1,
      },
      {
        id: 4,
        productId: 4,
        image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
        price: 399.99,
        quantity: 1,
      },
    ],
    total: 699.98,
  },
];

export default function OrdersPage() {
  const { t } = useLanguage();
  const mockOrders = getMockOrders();
  
  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('account.orders')}</h1>

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
                  className="block px-3 py-2 bg-blue-50 text-blue-600 font-semibold rounded"
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
                  className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  {t('account.recommendations')}
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2">
            {mockOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-600 text-lg mb-4">{t('account.orders.empty')}</p>
            <Link
              href="/"
              className="inline-block bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded"
            >
              {t('account.orders.startShopping')}
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pb-4 border-b">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-sm text-gray-600">{t('account.orders.orderPlaced')}</span>
                      <span className="text-sm font-semibold">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">{t('account.orders.total')}</span>
                      <span className="text-lg font-bold text-amazon-orange">${order.total.toFixed(2)}</span>
                    </div>
                    <div className="mt-2">
                      <span className="text-sm text-gray-600">{t('account.orders.order')} #{order.id}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'Delivered' ? t('common.delivered') : order.status}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {order.items.map((item) => {
                    const product = allProducts.find(p => p.id === item.productId);
                    const translatedProduct = product ? getTranslatedProduct(product, t) : null;
                    return (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={translatedProduct?.title || product?.titleKey || ''}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex-1">
                        <Link
                          href={`/product/${item.productId}`}
                          className="font-semibold text-lg hover:text-amazon-orange mb-2 block"
                        >
                          {translatedProduct?.title || product?.titleKey || ''}
                        </Link>
                        <p className="text-sm text-gray-600 mb-1">{t('common.quantity')} {item.quantity}</p>
                        <p className="text-lg font-bold text-amazon-orange">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button className="px-4 py-2 bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold rounded text-sm">
                          {t('account.orders.buyAgain')}
                        </button>
                        <button className="px-4 py-2 border border-gray-400 hover:bg-gray-50 text-black font-semibold rounded text-sm">
                          {t('account.orders.trackPackage')}
                        </button>
                      </div>
                    </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

