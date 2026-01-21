'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">{t('legal.privacy.title')}</h1>
          <div className="space-y-6 text-gray-700">
            <p className="text-sm text-gray-500">Last updated: January 2024</p>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">How We Use Your Information</h2>
              <p>
                We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Information Sharing</h2>
              <p>
                We do not sell your personal information. We may share your information with service providers who assist us in operating our website and conducting our business.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Your Rights</h2>
              <p>
                You have the right to access, update, or delete your personal information. You may also opt out of certain communications from us.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our website and hold certain information.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

