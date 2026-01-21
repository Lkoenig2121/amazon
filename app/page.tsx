'use client';

import HeroSection from '@/components/HeroSection';
import ProductSection from '@/components/ProductSection';
import Image from 'next/image';
import Link from 'next/link';
import { allProducts } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWishlist } from '@/contexts/WishlistContext';

export default function Home() {
  const { t } = useLanguage();
  const { toggleWishlist, isInWishlist } = useWishlist();
  // Get products from the data file
  const saksProducts = allProducts.filter(p => p.tags.includes('saks')).slice(0, 4);
  const beautyProducts = allProducts.filter(p => 
    p.tags.some(tag => ['beauty', 'makeup', 'skincare', 'luxury'].includes(tag))
  ).slice(0, 4);
  const luxuryProducts = allProducts.filter(p => 
    p.tags.includes('luxury') && !p.tags.includes('saks')
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-amazon-light">
      <HeroSection />
      <ProductSection
        title={t('home.shopSaks')}
        linkText={t('home.shopSaks')}
        products={saksProducts}
      />
      <ProductSection
        title={t('home.winterBeauty')}
        linkText={t('home.shopLuxuryBeauty')}
        products={beautyProducts}
      />
      <ProductSection
        title={t('home.luxuryStyles')}
        linkText={t('home.shopDesignerMarkdowns')}
        products={luxuryProducts}
      />
      
      {/* Best Sellers Section */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold mb-4">{t('home.bestSellers')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {allProducts
              .filter(p => p.tags.some(tag => ['computers', 'electronics', 'best sellers'].includes(tag.toLowerCase())))
              .slice(0, 8)
              .map((product) => {
                const inWishlist = isInWishlist(product.id);
                return (
                  <div key={product.id} className="group relative">
                    <Link
                      href={`/product/${product.id}`}
                      className="cursor-pointer hover:opacity-80 block"
                    >
                      <div className="bg-gray-100 aspect-square rounded mb-2 overflow-hidden relative">
                        <Image
                          src={product.image}
                          alt={t(product.titleKey)}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                        />
                        {/* Star button on hover */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:scale-110"
                          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <span className={`text-2xl ${inWishlist ? 'text-yellow-400' : 'text-gray-400'}`}>
                            {inWishlist ? '★' : '☆'}
                          </span>
                        </button>
                      </div>
                      <div className="text-xs line-clamp-2">
                        {t(product.titleKey)}
                      </div>
                      {product.price && (
                        <div className="text-sm font-bold text-amazon-orange">
                          ${product.price.toFixed(2)}
                        </div>
                      )}
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-amazon-blue text-white mt-8">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">{t('footer.getToKnowUs')}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/info#careers" className="hover:underline">{t('footer.careers')}</Link></li>
                <li><Link href="/info#blog" className="hover:underline">{t('footer.blog')}</Link></li>
                <li><Link href="/info#about" className="hover:underline">{t('footer.aboutAmazon')}</Link></li>
                <li><Link href="/info#investor" className="hover:underline">{t('footer.investorRelations')}</Link></li>
                <li><Link href="/info#devices" className="hover:underline">{t('footer.amazonDevices')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">{t('footer.makeMoneyWithUs')}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/sell#products" className="hover:underline">{t('footer.sellProducts')}</Link></li>
                <li><Link href="/sell#business" className="hover:underline">{t('footer.sellBusiness')}</Link></li>
                <li><Link href="/sell#apps" className="hover:underline">{t('footer.sellApps')}</Link></li>
                <li><Link href="/sell#affiliate" className="hover:underline">{t('footer.becomeAffiliate')}</Link></li>
                <li><Link href="/sell#advertise" className="hover:underline">{t('footer.advertiseProducts')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">{t('footer.paymentProducts')}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/payments#card" className="hover:underline">{t('footer.businessCard')}</Link></li>
                <li><Link href="/payments#points" className="hover:underline">{t('footer.shopWithPoints')}</Link></li>
                <li><Link href="/payments#reload" className="hover:underline">{t('footer.reloadBalance')}</Link></li>
                <li><Link href="/payments#currency" className="hover:underline">{t('footer.currencyConverter')}</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">{t('footer.needHelp')}</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="/help#covid" className="hover:underline">{t('footer.covid19')}</Link></li>
                <li><Link href="/help#account" className="hover:underline">{t('footer.yourAccount')}</Link></li>
                <li><Link href="/help#orders" className="hover:underline">{t('footer.yourOrders')}</Link></li>
                <li><Link href="/help#shipping" className="hover:underline">{t('footer.shippingRates')}</Link></li>
                <li><Link href="/help#returns" className="hover:underline">{t('footer.returnsReplacements')}</Link></li>
                <li><Link href="/help#help" className="hover:underline">{t('footer.help')}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm text-gray-300">
            <div className="mb-4">
              <span className="text-2xl font-bold">amazon</span>
              <span className="text-amazon-orange text-2xl font-bold">.com</span>
            </div>
            <div className="space-x-4">
              <Link href="/legal/conditions" className="hover:underline">{t('footer.conditionsOfUse')}</Link>
              <Link href="/legal/privacy" className="hover:underline">{t('footer.privacyNotice')}</Link>
              <Link href="/legal/ads-privacy" className="hover:underline">{t('footer.adsPrivacyChoices')}</Link>
            </div>
            <div className="mt-4">
              {t('footer.copyright')}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

