'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function ConditionsPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">{t('legal.conditions.title')}</h1>
          <div className="space-y-6 text-gray-700">
            <p className="text-sm text-gray-500">Last updated: January 2024</p>
            <section>
              <h2 className="text-2xl font-semibold mb-3">1. Conditions</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">2. Use License</h2>
              <p>
                Permission is granted to temporarily use this website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">3. Disclaimer</h2>
              <p>
                The materials on this website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim all other warranties including implied warranties or conditions of merchantability.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-3">4. Limitations</h2>
              <p>
                In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials on this website.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

