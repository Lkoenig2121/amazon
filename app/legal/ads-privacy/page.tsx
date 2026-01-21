'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function AdsPrivacyPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">{t('legal.adsPrivacy.title')}</h1>
          <div className="space-y-6 text-gray-700">
            <p className="text-sm text-gray-500">Last updated: January 2024</p>
            <section>
              <h2 className="text-2xl font-semibold mb-3">About Interest-Based Ads</h2>
              <p>
                We may show you personalized ads based on your interests. These ads help support our services and provide you with relevant content.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Your Choices</h2>
              <p>
                You can control how we use your information for personalized advertising. You can opt out of interest-based ads at any time through your account settings.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Opting Out</h2>
              <p>
                To opt out of personalized advertising, visit your account settings and adjust your advertising preferences. You can also use browser settings to block cookies.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">Third-Party Advertising</h2>
              <p>
                Some of our advertising partners may use cookies and web beacons on our site. You can opt out of many of these services through industry opt-out pages.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

