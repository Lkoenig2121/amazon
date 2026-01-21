'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function HeroSection() {
  const { t } = useLanguage();
  
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left Side - Text */}
          <div className="flex-1 mb-6 md:mb-0">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {t('home.prime.title')}
            </h1>
            <button className="bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold px-8 py-3 rounded text-lg">
              {t('home.prime.button')}
            </button>
          </div>

          {/* Right Side - Image/Content */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg max-w-md">
              <div className="text-center mb-4">
                <div className="text-2xl font-bold mb-2">prime</div>
                <div className="text-lg font-semibold">{t('hero.watchAllSeason')}</div>
              </div>
              <div className="flex justify-center space-x-4 mb-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-2">
                    LAL
                  </div>
                  <div className="text-xs">{t('hero.lakers')}</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold mb-2">
                    SAS
                  </div>
                  <div className="text-xs">{t('hero.spurs')}</div>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mb-2">
                    DET
                  </div>
                  <div className="text-xs">{t('hero.pistons')}</div>
                </div>
              </div>
              <div className="text-xs text-gray-600 text-center">
                {t('hero.termsApply')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

