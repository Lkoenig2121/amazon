'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function PaymentsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">{t('payments.title')}</h1>
          <div className="space-y-6">
            <section id="card">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.businessCard')}</h2>
              <p className="text-gray-700">
                Get 5% back or 90-day terms on purchases. Apply for the Amazon Business American Express Card.
              </p>
            </section>
            <section id="points">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.shopWithPoints')}</h2>
              <p className="text-gray-700">
                Use your credit card rewards points to make purchases on Amazon. Connect your rewards account and start shopping.
              </p>
            </section>
            <section id="reload">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.reloadBalance')}</h2>
              <p className="text-gray-700">
                Add funds to your Amazon account balance for faster checkout and convenient payment options.
              </p>
            </section>
            <section id="currency">
              <h2 className="text-2xl font-semibold mb-3">{t('footer.currencyConverter')}</h2>
              <p className="text-gray-700">
                Convert prices to your local currency when shopping internationally. See prices in your preferred currency.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

