'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface User {
  id: number;
  name: string;
  email: string;
}

export default function AccountPage() {
  const { t } = useLanguage();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });

  useEffect(() => {
    // Fetch user data
    fetch('http://localhost:3001/api/auth/me', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          setFormData({
            name: data.user.name || '',
            email: data.user.email || '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
          });
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleSave = () => {
    // In a real app, this would update the user profile via API
    console.log('Saving profile:', formData);
    setEditMode(false);
    alert('Profile updated successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-amazon-light flex items-center justify-center">
        <p className="text-gray-600">{t('common.loading')}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-amazon-light">
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-3xl font-bold mb-4">{t('account.title')}</h1>
            <p className="text-gray-600 mb-6">{t('account.needSignIn')}</p>
            <Link
              href="/login"
              className="inline-block bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded"
            >
              {t('common.signIn')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amazon-light">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">{t('account.title')}</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Account Navigation */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
              <h2 className="font-bold text-lg mb-4">{t('account.settings')}</h2>
              <nav className="space-y-2">
                <Link
                  href="/account"
                  className="block px-3 py-2 bg-blue-50 text-blue-600 font-semibold rounded"
                >
                  {t('account.title')}
                </Link>
                <Link
                  href="/account/orders"
                  className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  {t('account.orders')}
                </Link>
                <Link
                  href="/account/wishlist"
                  className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  {t('account.wishlist')}
                </Link>
                <Link
                  href="/account/recommendations"
                  className="block px-3 py-2 hover:bg-gray-100 rounded text-gray-700"
                >
                  {t('account.recommendations')}
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{t('account.personalInfo')}</h2>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    {t('account.edit')}
                  </button>
                )}
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">{t('account.phone')}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-400 rounded text-black"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded"
                    >
                      {t('account.saveChanges')}
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-black font-semibold py-2 px-6 rounded"
                    >
                      {t('account.cancel')}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Name:</span>
                    <p className="font-semibold">{user.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    <p className="font-semibold">{user.email}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">{t('account.phone')}:</span>
                    <p className="font-semibold">{formData.phone || t('account.notProvided')}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Address Book */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{t('account.addressBook')}</h2>
                <button className="text-blue-600 hover:text-blue-800 font-semibold">
                  {t('account.addNewAddress')}
                </button>
              </div>

              {formData.address ? (
                <div className="border border-gray-200 rounded p-4">
                  <p className="font-semibold mb-2">{t('account.defaultAddress')}</p>
                  <p>{formData.address}</p>
                  <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                  <button className="text-blue-600 hover:text-blue-800 text-sm mt-2">
                    {t('account.edit')}
                  </button>
                </div>
              ) : (
                <p className="text-gray-600">{t('account.noAddresses')}</p>
              )}
            </div>

            {/* Payment Methods */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{t('account.paymentMethods')}</h2>
                <button className="text-blue-600 hover:text-blue-800 font-semibold">
                  {t('account.addPaymentMethod')}
                </button>
              </div>
              <p className="text-gray-600">{t('account.noPaymentMethods')}</p>
            </div>

            {/* Prime Membership */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold mb-4">{t('account.primeMembership')}</h2>
              <div className="bg-blue-50 border border-blue-200 rounded p-4">
                <p className="font-semibold text-blue-900 mb-2">{t('account.notPrime')}</p>
                <p className="text-sm text-blue-800 mb-4">
                  {t('account.joinPrimeDesc')}
                </p>
                <button className="bg-amazon-yellow hover:bg-yellow-400 text-black font-semibold py-2 px-6 rounded">
                  {t('home.prime.button')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

