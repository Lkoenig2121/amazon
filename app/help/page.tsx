'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function HelpPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">{t('help.title')}</h1>
          <div className="space-y-6">
            <section id="covid">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.covid19')}</h2>
              <p className="text-gray-700">
                Learn about our safety measures, delivery updates, and how we're supporting our customers and communities during COVID-19.
              </p>
            </section>
            <section id="account">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.yourAccount')}</h2>
              <p className="text-gray-700">
                Manage your account settings, payment methods, addresses, and account preferences.
              </p>
            </section>
            <section id="orders">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.yourOrders')}</h2>
              <p className="text-gray-700">
                Track your orders, view order history, and manage returns or refunds.
              </p>
            </section>
            <section id="shipping">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.shippingRates')}</h2>
              <p className="text-gray-700">
                View shipping options, delivery times, and shipping costs. Learn about Prime shipping benefits.
              </p>
            </section>
            <section id="returns">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.returnsReplacements')}</h2>
              <p className="text-gray-700">
                Find out how to return items, request replacements, or get refunds for eligible products.
              </p>
            </section>
            <section id="help">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.help')}</h2>
              <p className="text-gray-700">
                Get answers to common questions, contact customer service, or find support for your order.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

