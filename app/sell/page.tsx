'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function SellPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">{t('sell.title')}</h1>
          <div className="space-y-6">
            <section id="products">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.sellProducts')}</h2>
              <p className="text-gray-700">
                Start selling your products to millions of customers worldwide. Set up your seller account and start growing your business today.
              </p>
            </section>
            <section id="business">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.sellBusiness')}</h2>
              <p className="text-gray-700">
                Reach business customers with Amazon Business. Offer your products to organizations and institutions.
              </p>
            </section>
            <section id="apps">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.sellApps')}</h2>
              <p className="text-gray-700">
                Develop and publish your apps on the Amazon Appstore. Reach millions of users across multiple devices.
              </p>
            </section>
            <section id="affiliate">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.becomeAffiliate')}</h2>
              <p className="text-gray-700">
                Join our affiliate program and earn commissions by promoting products on your website or blog.
              </p>
            </section>
            <section id="advertise">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.advertiseProducts')}</h2>
              <p className="text-gray-700">
                Promote your products with sponsored ads and reach customers when they're searching for items like yours.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

