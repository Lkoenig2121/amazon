'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function InfoPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">{t('info.title')}</h1>
          <div className="space-y-6">
            <section id="careers">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.careers')}</h2>
              <p className="text-gray-700">
                Join our team and help shape the future of e-commerce. We're always looking for talented individuals to join our growing company.
              </p>
            </section>
            <section id="blog">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.blog')}</h2>
              <p className="text-gray-700">
                Read our latest news, updates, and insights about technology, e-commerce, and innovation.
              </p>
            </section>
            <section id="about">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.aboutAmazon')}</h2>
              <p className="text-gray-700">
                Learn more about our company, mission, and commitment to customer service and innovation.
              </p>
            </section>
            <section id="investor">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.investorRelations')}</h2>
              <p className="text-gray-700">
                Access financial information, investor resources, and company updates for shareholders.
              </p>
            </section>
            <section id="devices">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.amazonDevices')}</h2>
              <p className="text-gray-700">
                Discover our range of devices including Kindle, Echo, Fire TV, and more innovative products.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

