'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useLanguage, languages } from '@/contexts/LanguageContext';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Header() {
  const router = useRouter();
  const { cart, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const { language, setLanguage, t, currentLanguage } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showAllDropdown, setShowAllDropdown] = useState(false);
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const accountRef = useRef<HTMLDivElement>(null);
  const allRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const languageRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Check if user is logged in
    fetch('http://localhost:3001/api/auth/me', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {
        // Not logged in
      });

    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setShowAccountDropdown(false);
      }
      if (allRef.current && !allRef.current.contains(event.target as Node)) {
        setShowAllDropdown(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCartDropdown(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
      if (
        showMobileMenu &&
        mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(event.target as Node)
      ) {
        setShowMobileMenu(false);
      }
      if (
        showMobileSearch &&
        mobileSearchRef.current && 
        !mobileSearchRef.current.contains(event.target as Node) &&
        mobileSearchButtonRef.current &&
        !mobileSearchButtonRef.current.contains(event.target as Node)
      ) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showMobileMenu, showMobileSearch]);

  const handleLogout = async () => {
    await fetch('http://localhost:3001/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    setShowAccountDropdown(false);
    window.location.reload();
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      const categoryParam = selectedCategory !== 'All' ? `&category=${encodeURIComponent(selectedCategory)}` : '';
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}${categoryParam}`);
    } else {
      router.push('/search');
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowAllDropdown(false);
    if (searchQuery.trim()) {
      handleSearch();
    }
  };

  return (
    <header className="bg-amazon-dark text-white">
      {/* Top Header */}
      <div className="flex items-center px-2 sm:px-4 py-2 space-x-1 sm:space-x-4">
        {/* Mobile Menu Button */}
        <button
          ref={mobileMenuButtonRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowMobileMenu(!showMobileMenu);
          }}
          className="md:hidden flex items-center hover:border-white border border-transparent px-2 py-1"
          aria-label="Toggle mobile menu"
        >
          <span className="text-xl">☰</span>
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <span className="text-xl sm:text-2xl font-bold text-white">amazon</span>
          <span className="text-amazon-orange text-xl sm:text-2xl font-bold">.com</span>
        </Link>

        {/* Delivery Location */}
        <div className="hidden lg:flex items-center text-xs cursor-pointer hover:border-white border border-transparent px-2 py-1">
          <div>
            <div className="text-gray-400">{t('header.delivering')}</div>
            <div className="font-bold">Lanoka Ha... 087434</div>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 items-center max-w-3xl relative min-w-0">
          <form onSubmit={handleSearch} className="flex w-full relative">
            <div className="relative" ref={allRef}>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-3 py-2 rounded-l-md hover:bg-gray-300 border-r border-gray-400 text-sm"
                onClick={() => setShowAllDropdown(!showAllDropdown)}
              >
                {t('header.all')} <span className="ml-1">▼</span>
              </button>
              {showAllDropdown && (
                <div className="absolute top-full left-0 mt-1 bg-white text-black shadow-lg z-50 w-64 p-4 rounded border border-gray-200 max-h-96 overflow-y-auto">
                  <div className="space-y-2">
                    <div className="font-bold text-sm mb-2">Shop by Department</div>
                    <div 
                      className={`hover:bg-gray-100 p-2 cursor-pointer ${selectedCategory === 'All' ? 'bg-blue-50' : ''}`}
                      onClick={() => handleCategorySelect('All')}
                    >
                      All Departments
                    </div>
                    <div 
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => handleCategorySelect('Books')}
                    >
                      Books
                    </div>
                    <div 
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => handleCategorySelect('Electronics')}
                    >
                      Electronics
                    </div>
                    <div 
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => handleCategorySelect('Computers')}
                    >
                      Computers
                    </div>
                    <div 
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => handleCategorySelect('Beauty')}
                    >
                      Beauty & Personal Care
                    </div>
                    <div 
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => handleCategorySelect('Medical')}
                    >
                      Health & Household
                    </div>
                    <div 
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => handleCategorySelect('Smart Home')}
                    >
                      Smart Home
                    </div>
                    <div 
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => handleCategorySelect('Deals')}
                    >
                      Deals
                    </div>
                    <div 
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => handleCategorySelect('Gift Cards')}
                    >
                      Gift Cards
                    </div>
                    <div 
                      className="hover:bg-gray-100 p-2 cursor-pointer"
                      onClick={() => handleCategorySelect('Fashion')}
                    >
                      Fashion
                    </div>
                  </div>
                </div>
              )}
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-black text-base min-w-0"
              placeholder={t('header.search.placeholder')}
            />
            <button 
              type="submit"
              className="bg-amazon-orange hover:bg-orange-600 px-6 py-2 rounded-r-md"
            >
              <span className="text-base">🔍</span>
            </button>
          </form>
        </div>

        {/* Mobile Search Icon Button */}
        <button
          ref={mobileSearchButtonRef}
          onClick={(e) => {
            e.stopPropagation();
            setShowMobileSearch(!showMobileSearch);
          }}
          className="md:hidden flex items-center hover:border-white border border-transparent px-2 py-1"
          aria-label="Toggle search"
        >
          <span className="text-xl">🔍</span>
        </button>

        {/* Account & Lists */}
        <div className="hidden md:flex relative" ref={accountRef}>
          <button
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="flex items-center cursor-pointer hover:border-white border border-transparent px-2 py-1 text-sm"
          >
            <div className="text-left">
              <div className="text-xs text-gray-300">{user ? t('header.hello') : t('header.signIn')}</div>
              <div className="font-bold">{user ? user.name : t('header.accountLists')}</div>
            </div>
          </button>
          {showAccountDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white text-black shadow-xl z-50 w-64 rounded border border-gray-200 p-4">
              {user ? (
                <div>
                  <div className="font-bold text-lg mb-2">{t('header.hello')}, {user.name}</div>
                  <div className="space-y-2">
                    <Link href="/account" className="block hover:text-amazon-orange" onClick={() => setShowAccountDropdown(false)}>
                      {t('account.yourAccount')}
                    </Link>
                    <Link href="/account/orders" className="block hover:text-amazon-orange" onClick={() => setShowAccountDropdown(false)}>
                      {t('account.yourOrders')}
                    </Link>
                    <Link href="/account/wishlist" className="block hover:text-amazon-orange" onClick={() => setShowAccountDropdown(false)}>
                      {t('account.wishlist')}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left hover:text-amazon-orange"
                    >
                      {t('header.signOut')}
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <Link
                    href="/login"
                    className="block w-full bg-amazon-yellow hover:bg-yellow-400 text-black py-2 px-4 rounded text-sm font-semibold text-center mb-2"
                    onClick={() => setShowAccountDropdown(false)}
                  >
                    {t('common.signIn')}
                  </Link>
                  <div className="text-xs text-gray-600 text-center">
                    {t('header.newCustomer')} <Link href="/register" className="text-blue-600 hover:underline">{t('header.startHere')}</Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart */}
        <div className="relative" ref={cartRef}>
          <button
            onClick={() => setShowCartDropdown(!showCartDropdown)}
            className="flex items-center cursor-pointer hover:border-white border border-transparent px-2 py-1"
          >
            <div className="relative">
              <span className="text-2xl">🛒</span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-amazon-orange text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </div>
            <span className="hidden md:inline ml-1 font-bold text-sm">{t('header.cart')}</span>
          </button>
          {showCartDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white text-black shadow-xl z-50 w-80 rounded border border-gray-200">
              {cart.length === 0 ? (
                <div className="p-4 text-center">
                  <p className="text-gray-600 mb-4">{t('cart.empty')}</p>
                  <Link
                    href="/"
                    className="block w-full bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded text-center"
                    onClick={() => setShowCartDropdown(false)}
                  >
                    {t('cart.shopDeals')}
                  </Link>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  <div className="p-4">
                    <div className="font-bold text-lg mb-4">{t('cart.title')}</div>
                    <div className="space-y-4 mb-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 border-b pb-3">
                          <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                            <img
                              src={item.image}
                              alt={t(item.titleKey)}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <Link
                              href={`/product/${item.id}`}
                              className="text-sm font-semibold hover:text-amazon-orange line-clamp-2"
                              onClick={() => setShowCartDropdown(false)}
                            >
                              {t(item.titleKey)}
                            </Link>
                            <p className="text-xs text-gray-600 mt-1">{t('common.qty')} {item.quantity}</p>
                            {item.price && (
                              <p className="text-sm font-bold text-amazon-orange mt-1">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-600 hover:text-red-800 text-sm"
                            title="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between mb-4">
                        <span className="font-bold">{t('cart.subtotal')}:</span>
                        <span className="font-bold">${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <Link
                        href="/checkout"
                        className="block w-full bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded text-center"
                        onClick={() => setShowCartDropdown(false)}
                      >
                        {t('cart.checkout')}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Language Selector */}
        <div className="hidden lg:flex relative" ref={languageRef}>
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center cursor-pointer hover:border-white border border-transparent px-2 py-1"
          >
            <span className="text-sm">{currentLanguage.code.toUpperCase()}</span>
            <span className="ml-1 text-xs">▼</span>
          </button>
          {showLanguageDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white text-black shadow-xl z-50 w-64 rounded border border-gray-200 p-4">
              <div className="font-bold text-sm mb-2">Change Language</div>
              <div className="space-y-1 text-sm max-h-64 overflow-y-auto">
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`hover:bg-gray-100 p-2 cursor-pointer ${
                      language === lang.code ? 'bg-blue-50 font-semibold' : ''
                    }`}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLanguageDropdown(false);
                    }}
                  >
                    {lang.nativeName} - {lang.code.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Account & Lists */}
        <div className="relative" ref={accountRef}>
          <button
            onClick={() => setShowAccountDropdown(!showAccountDropdown)}
            className="flex flex-col items-start hover:border-white border border-transparent px-1 sm:px-2 py-1"
          >
            <div className="text-xs text-gray-300 hidden sm:block">
              {user ? t('header.hello') : t('header.hello.guest')}
            </div>
            <div className="text-xs sm:text-sm font-bold">
              {t('header.account')}
            </div>
          </button>
          {showAccountDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white text-black shadow-xl z-50 w-72 sm:w-80 rounded border border-gray-200 max-h-[90vh] overflow-y-auto">
              {user ? (
                <div className="p-4">
                  <div className="border-b pb-4 mb-4">
                    <div className="text-xs text-green-600 font-semibold mb-1">✓ You're signed in</div>
                    <div className="font-semibold text-lg">{user.name}</div>
                    <div className="text-sm text-gray-600">{user.email}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="font-bold text-sm">Your Account</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <Link href="/account/orders" className="hover:bg-gray-100 p-2 cursor-pointer" onClick={() => setShowAccountDropdown(false)}>Your Orders</Link>
                      <Link href="/account/wishlist" className="hover:bg-gray-100 p-2 cursor-pointer" onClick={() => setShowAccountDropdown(false)}>Your Wish List</Link>
                      <Link href="/account" className="hover:bg-gray-100 p-2 cursor-pointer" onClick={() => setShowAccountDropdown(false)}>Your Account</Link>
                      <Link href="/account/recommendations" className="hover:bg-gray-100 p-2 cursor-pointer" onClick={() => setShowAccountDropdown(false)}>Your Recommendations</Link>
                      <div className="hover:bg-gray-100 p-2 cursor-pointer">Your Prime Membership</div>
                      <div className="hover:bg-gray-100 p-2 cursor-pointer">Your Subscribe & Save Items</div>
                      <div className="hover:bg-gray-100 p-2 cursor-pointer">Your Memberships & Subscriptions</div>
                      <div className="hover:bg-gray-100 p-2 cursor-pointer">Your Prime Video</div>
                      <div className="hover:bg-gray-100 p-2 cursor-pointer">Your Kindle Unlimited</div>
                      <div className="hover:bg-gray-100 p-2 cursor-pointer">Your Content & Devices</div>
                      <div className="hover:bg-gray-100 p-2 cursor-pointer">Your Apps & Games</div>
                      <div className="hover:bg-gray-100 p-2 cursor-pointer">Your Music Library</div>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <button
                        onClick={handleLogout}
                        className="w-full bg-amazon-yellow hover:bg-yellow-400 text-black py-2 px-4 rounded text-sm font-semibold"
                      >
                        {t('common.signOut')}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-4">
                  <div className="mb-4">
                    <Link
                      href="/login"
                      className="block w-full bg-amazon-yellow hover:bg-yellow-400 text-black py-2 px-4 rounded text-sm font-semibold text-center mb-2"
                    >
                      {t('common.signIn')}
                    </Link>
                    <div className="text-xs text-gray-600">
                      New customer? <Link href="/register" className="text-blue-600 hover:underline">Start here.</Link>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <div className="font-bold text-sm mb-2">Your Lists</div>
                    <div className="text-sm space-y-1">
                      <div className="hover:bg-gray-100 p-2 cursor-pointer">Create a List</div>
                      <div className="hover:bg-gray-100 p-2 cursor-pointer">Find a List or Registry</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Returns & Orders */}
        <div className="hidden lg:flex flex-col items-start hover:border-white border border-transparent px-2 py-1 cursor-pointer">
          <div className="text-xs text-gray-300">{t('header.returns')}</div>
          <div className="text-sm font-bold">{t('header.orders')}</div>
        </div>

        {/* Cart */}
        <div className="relative" ref={cartRef}>
          <button
            onClick={() => setShowCartDropdown(!showCartDropdown)}
            className="flex items-center hover:border-white border border-transparent px-1 sm:px-2 py-1"
          >
            <span className="text-xl sm:text-2xl">🛒</span>
            <span className="text-xs sm:text-sm font-bold ml-1 hidden sm:inline">{t('header.cart')}</span>
            <span className="text-amazon-orange font-bold ml-1">{getTotalItems()}</span>
          </button>
          {showCartDropdown && (
            <div className="absolute right-0 top-full mt-1 bg-white text-black shadow-xl z-50 w-80 sm:w-96 rounded border border-gray-200 max-h-[90vh] overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8 p-4">
                  <div className="text-gray-500 mb-2">{t('cart.empty')}</div>
                  <Link
                    href="/"
                    className="text-blue-600 hover:text-amazon-orange hover:underline text-sm"
                    onClick={() => setShowCartDropdown(false)}
                  >
                    {t('cart.shopDeals')}
                  </Link>
                </div>
              ) : (
                <div className="p-4">
                  <div className="font-bold text-lg mb-4">{t('cart.title')}</div>
                  <div className="space-y-4 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-3 border-b pb-3">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden relative flex-shrink-0">
                          <img
                            src={item.image}
                            alt={t(item.titleKey)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/product/${item.id}`}
                            className="text-sm font-semibold hover:text-amazon-orange line-clamp-2"
                            onClick={() => setShowCartDropdown(false)}
                          >
                            {t(item.titleKey)}
                          </Link>
                          <p className="text-xs text-gray-600 mt-1">{t('common.qty')} {item.quantity}</p>
                          {item.price && (
                            <p className="text-sm font-bold text-amazon-orange mt-1">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                          title="Remove"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="font-bold">{t('cart.subtotal')} ({getTotalItems()} {t('cart.items')}):</span>
                      <span className="font-bold text-lg">${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <Link
                      href="/checkout"
                      onClick={() => setShowCartDropdown(false)}
                      className="block w-full bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded text-center"
                    >
                      {t('cart.checkout')}
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div ref={mobileSearchRef} className="md:hidden bg-amazon-dark border-t border-gray-700 px-4 py-3">
          <form onSubmit={handleSearch} className="flex w-full relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 text-black text-base rounded-l-md min-w-0"
              placeholder={t('header.search.placeholder')}
              autoFocus
            />
            <button 
              type="submit"
              className="bg-amazon-orange hover:bg-orange-600 px-4 py-2 rounded-r-md"
              onClick={() => setShowMobileSearch(false)}
            >
              <span className="text-base">🔍</span>
            </button>
            <button
              type="button"
              onClick={() => setShowMobileSearch(false)}
              className="ml-2 px-3 py-2 text-white hover:bg-gray-700 rounded"
            >
              ✕
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div 
          ref={mobileMenuRef}
          className="md:hidden fixed inset-0 top-[60px] bg-amazon-dark z-50 overflow-y-auto"
        >
          <div className="p-4 space-y-4">
          {/* Account Section */}
          <div className="border-b border-gray-700 pb-4">
            {user ? (
              <div>
                <div className="text-xs text-green-400 font-semibold mb-1">✓ {t('header.signedIn')}</div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-400">{user.email}</div>
              </div>
            ) : (
              <div>
                <Link
                  href="/login"
                  className="block w-full bg-amazon-yellow hover:bg-yellow-400 text-black py-2 px-4 rounded text-sm font-semibold text-center mb-2"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {t('common.signIn')}
                </Link>
                <div className="text-xs text-gray-400 text-center">
                  {t('header.newCustomer')} <Link href="/register" className="text-blue-400 hover:underline">{t('header.startHere')}</Link>
                </div>
              </div>
            )}
          </div>

          {/* Language Selector */}
          <div className="border-b border-gray-700 pb-4">
            <div className="font-semibold mb-2">{t('header.changeLanguage')}</div>
            <div className="space-y-1 text-sm max-h-48 overflow-y-auto">
              {languages.map((lang) => (
                <div
                  key={lang.code}
                  className={`hover:bg-gray-800 p-2 cursor-pointer rounded ${
                    language === lang.code ? 'bg-gray-800 font-semibold' : ''
                  }`}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowMobileMenu(false);
                  }}
                >
                  {lang.nativeName} - {lang.code.toUpperCase()}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="border-b border-gray-700 pb-4">
            <div className="font-semibold mb-2">{t('header.quickLinks')}</div>
            <div className="space-y-2 text-sm">
              {user && (
                <>
                  <Link href="/account/orders" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                    {t('account.yourOrders')}
                  </Link>
                  <Link href="/account/wishlist" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                    {t('account.wishlist')}
                  </Link>
                  <Link href="/account" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                    {t('account.yourAccount')}
                  </Link>
                </>
              )}
              <Link href="/category/todays-deals" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.todaysDeals')}
              </Link>
              <Link href="/category/best-sellers" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.bestSellers')}
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="border-b border-gray-700 pb-4">
            <div className="font-semibold mb-2">{t('header.shopByDepartment')}</div>
            <div className="space-y-2 text-sm">
              <Link href="/category/amazon-haul" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.amazonHaul')}
              </Link>
              <Link href="/category/medical-care" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.medicalCare')}
              </Link>
              <Link href="/category/amazon-basics" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.amazonBasics')}
              </Link>
              <Link href="/category/best-sellers" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.bestSellers')}
              </Link>
              <Link href="/category/books" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.books')}
              </Link>
              <Link href="/category/registry" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.registry')}
              </Link>
              <Link href="/category/new-releases" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.newReleases')}
              </Link>
              <Link href="/category/gift-cards" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.giftCards')}
              </Link>
              <Link href="/category/smart-home" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.smartHome')}
              </Link>
              <Link href="/category/todays-deals" className="block hover:text-amazon-orange" onClick={() => setShowMobileMenu(false)}>
                {t('nav.todaysDeals')}
              </Link>
            </div>
          </div>

          {/* Prime Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 rounded-lg mt-4">
            <div className="mb-3">
              <div className="text-lg font-bold mb-2">{t('home.prime.title')}</div>
            </div>
            <button 
              className="w-full bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded text-sm"
              onClick={() => setShowMobileMenu(false)}
            >
              {t('home.prime.button')}
            </button>
          </div>
          </div>
        </div>
      )}

      {/* Navigation Bar */}
      <div className="hidden md:flex items-center bg-amazon-blue px-4 py-2 space-x-4 text-sm overflow-x-auto">
        <button
          className="flex items-center hover:border-white border border-transparent px-2 py-1 flex-shrink-0"
          onClick={() => setShowAllDropdown(!showAllDropdown)}
        >
          <span className="text-lg mr-1">☰</span>
          <span>{t('nav.all')}</span>
        </button>
        <Link href="/category/amazon-haul" className="hover:border-white border border-transparent px-2 py-1 whitespace-nowrap">{t('nav.amazonHaul')}</Link>
        <Link href="/category/medical-care" className="hover:border-white border border-transparent px-2 py-1 whitespace-nowrap">{t('nav.medicalCare')}</Link>
        <Link href="/category/amazon-basics" className="hover:border-white border border-transparent px-2 py-1 whitespace-nowrap">{t('nav.amazonBasics')}</Link>
        <Link href="/category/best-sellers" className="hover:border-white border border-transparent px-2 py-1 whitespace-nowrap">{t('nav.bestSellers')}</Link>
        <Link href="/category/books" className="hover:border-white border border-transparent px-2 py-1 whitespace-nowrap">{t('nav.books')}</Link>
        <Link href="/category/registry" className="hover:border-white border border-transparent px-2 py-1 whitespace-nowrap">{t('nav.registry')}</Link>
        <Link href="/category/new-releases" className="hover:border-white border border-transparent px-2 py-1 whitespace-nowrap">{t('nav.newReleases')}</Link>
        <Link href="/category/gift-cards" className="hover:border-white border border-transparent px-2 py-1 whitespace-nowrap">{t('nav.giftCards')}</Link>
        <Link href="/category/smart-home" className="hover:border-white border border-transparent px-2 py-1 whitespace-nowrap">{t('nav.smartHome')}</Link>
        <Link href="/category/todays-deals" className="hover:border-white border border-transparent px-2 py-1 whitespace-nowrap">{t('nav.todaysDeals')}</Link>
      </div>
    </header>
  );
}

